// import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Button,
  Field,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Toolbar,
  ToolbarDivider,
  shorthands,
  makeStyles,
  Spinner,
} from "@fluentui/react-components";
import { exportFileCSV } from "../lib/exportFileCSV";
import dayjs from "dayjs";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { addDays } from "@fluentui/react-calendar-compat";
import { Search12Filled } from "@fluentui/react-icons";

interface IAttendance {
  id: number;
  mode: string;
  name: string;
  cardId?: string | null | undefined;
  userId?: string | null | undefined;
  usersId: number;
  createdAt: string;
}

export const Route = createFileRoute("/admin")({
  component: AdminComponent,
});

const useStyles = makeStyles({
  root: {
    display: "flex",
    ...shorthands.gap("4px"),
    marginBottom: "8px",
    alignItems: "end",
  },
});

function AdminComponent() {
  const navigate = useNavigate();
  const styles = useStyles();
  const today = new Date();
  const [startDate, setStartDate] = useState<Date | null | undefined>(
    addDays(today, -7)
  );
  const [endDate, setEndDate] = useState<Date | null | undefined>(today);
  const [datas, setDatas] = useState<IAttendance[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    search();
  }, []);

  const columns = [
    { columnKey: "id", label: "No." },
    { columnKey: "mode", label: "上下班" },
    { columnKey: "name", label: "姓名" },
    { columnKey: "cardId", label: "Card ID" },
    { columnKey: "userId", label: "員工 ID" },
    { columnKey: "usersId", label: "員工流水號" },
    { columnKey: "createdAt", label: "打卡時間" },
  ];

  const exportCSV = () => {
    const title = [
      "No.",
      "上下班",
      "姓名",
      "Card ID",
      "員工 ID",
      "員工流水號",
      "打卡時間",
    ];
    const formatData = datas.map((data) => {
      return [
        data.id,
        data.mode,
        data.name,
        data.cardId,
        data.userId,
        data.usersId,
        dayjs(data.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      ];
    });
    exportFileCSV(title, formatData);
  };

  const search = () => {
    setLoading(true);
    axios({
      method: "GET",
      url: "/api/v1/attendances",
      params: {
        start: dayjs(startDate).format("YYYY-MM-DD"),
        end: dayjs(endDate).format("YYYY-MM-DD"),
      },
      withCredentials: true,
    })
      .then(({ data }) => {
        setDatas(data.content);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate({
            to: "/",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    axios({
      method: "POST",
      url: "/api/v1/users/logout",
    }).then((res: AxiosResponse) => {
      if (res.data.statusCode === 200) {
        window.localStorage.clear();
        window.sessionStorage.clear();
        navigate({
          to: "/",
        });
      }
    });
  };
  return (
    <div className="p-2">
      <h3>Admin</h3>
      <Toolbar>
        <Button onClick={exportCSV}>輸出CSV</Button>
        <ToolbarDivider />
        <Button onClick={logout}>登出</Button>
      </Toolbar>
      <div className={styles.root}>
        <Field label={"開始日期"}>
          <DatePicker
            value={startDate}
            placeholder="請選擇開始日期"
            onSelectDate={(date) => {
              setStartDate(date);
            }}
          />
        </Field>
        <Field label={"結束日期"}>
          <DatePicker
            value={endDate}
            minDate={startDate || undefined}
            placeholder="請選擇結束日期"
            onSelectDate={(date) => {
              setEndDate(date);
            }}
          />
        </Field>
        <Button appearance="primary" icon={<Search12Filled />} onClick={search}>
          搜尋
        </Button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <Table aria-label="punches">
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHeaderCell key={col.columnKey}>
                  {col.label}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Spinner label={"讀取中"} />
                </TableCell>
              </TableRow>
            )}
            {!loading && datas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>查無資料</TableCell>
              </TableRow>
            ) : (
              datas.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.mode}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.cardId}</TableCell>
                  <TableCell>{item.userId}</TableCell>
                  <TableCell>{item.usersId}</TableCell>
                  <TableCell>
                    {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
