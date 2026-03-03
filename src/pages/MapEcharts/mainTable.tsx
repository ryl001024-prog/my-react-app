import { User } from "@/api/mock";
import { useLoading } from "@/composables/useLoading";
import { useTableScrollHeight } from "@/composables/useTableScrollHeight";
import {
  PaginationProps,
  Table,
  TableColumnsType,
  App,
  TableProps,
} from "antd";
import { useState, useEffect, useCallback } from "react";

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { message } = App.useApp();
  const { loading, wrapLoading } = useLoading();
  const tableHeight = useTableScrollHeight();
  const [pagination, setPagination] = useState<{
    current: number;
    pageSize: number;
    total: number;
  }>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const columns: TableColumnsType<User> = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
      align: "center",
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      key: "email",
      title: "邮箱",
      dataIndex: "email",
      align: "center",
    },
    {
      key: "department",
      title: "部门",
      dataIndex: "department",
      align: "center",
    },
    {
      key: "role",
      title: "角色",
      dataIndex: "role",
      align: "center",
    },
    {
      key: "status",
      title: "状态",
      dataIndex: "status",
      align: "center",
    },
    {
      key: "salary",
      title: "薪水",
      dataIndex: "salary",
      align: "center",
    },
    {
      key: "action",
      title: "操作",
      dataIndex: "salary",
      align: "center",
    },
  ];

  const fetchUsers = useCallback(
    async (page = 1, pageSize = 20) => {
      wrapLoading(async () => {
        try {
          const response = await fetch("http://127.0.0.1:3002/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              page,
              pageSize,
              sort: {
                field: "id",
                order: "asc",
              },
            }),
          });

          if (!response.ok) {
            throw new Error("请求失败");
          }

          const result = await response.json();

          if (result.success) {
            console.log(result, "result");

            setUsers(result.data);
            setPagination(result.pagination);
          } else {
            throw new Error(result.message || "未知错误");
          }
        } catch (err: any) {
          message.error(`API错误: ${err?.message || err?.toString()}`);
        }
      });
    },
    [message, wrapLoading],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePageChange = (page: number, pageSize: number) => {
    fetchUsers(page, pageSize);
  };

  const showTotal: PaginationProps["showTotal"] = (total) => `共 ${total} 条`;

  const stylesFn: TableProps<User>["styles"] = (info) => {
    if (info?.props?.size === "middle") {
      return {
        root: {
          height: "100%",
          width: "100%",
          color: "#e0e0e0",
          borderRadius: 8,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        },
        title: {
          backgroundImage: "linear-gradient(90deg, #6a5acd, #836fff)",
          color: "#fff",
          fontSize: "1.25rem",
          fontWeight: 600,
          padding: "12px 16px",
          height: "55px",
        },
        content: {
          flex: 1,
          // 添加滚动支持
          overflowY: "auto",
          //   maxHeight: "calc(100vh - 210px)", // 留出顶部和底部空间
          maxHeight: `${tableHeight}px`,
        },
        footer: {
          color: "#9ca3af",
          height: "50px",
          background: "pink",
        },
        header: {
          cell: {
            fontWeight: 600,
            fontSize: "0.95rem",
            color: "#b8bdfd",
            padding: "12px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            height: "50px",
          },
        },
        pagination: {
          root: {
            padding: "10px 10px 0",
            height: "40px",
          },
          item: {
            color: "#b8bdfd",
          },
        },
      } satisfies TableProps<User>["styles"];
    }
    return {};
  };

  return (
    <div className="w-full p-4 h-full overflow-hidden box-border">
      <Table
        dataSource={users}
        columns={columns}
        loading={loading}
        title={() => "Table Object Styles"}
        footer={() => "Table Object Footer"}
        styles={stylesFn}
        size="middle"
        pagination={{
          size: "small",
          showSizeChanger: true,
          showTotal: showTotal,
          showQuickJumper: true,
          onChange: handlePageChange,
          total: pagination.total,
          current: pagination.current,
          pageSize: pagination.pageSize,
        }}
        rowKey="id"
      />
    </div>
  );
};

export default UserTable;
