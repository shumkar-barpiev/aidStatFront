"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Box,
  Checkbox,
  Tooltip,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  ListItemButton,
  ListItem,
  List,
  ListItemIcon,
  Badge,
  CircularProgress,
} from "@mui/material";
import {
  BaseSingleInputFieldProps,
  DatePicker,
  DateValidationError,
  DayCalendarSkeleton,
  FieldSection,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { TOrderUserTaskModel } from "@/models/orders/order-user-task";
import { useOrderUserTaskStore } from "@/stores/orders/order-user-tasks";
import { TModelFilters } from "@/types/model";

interface TaskTextFieldProps
  extends BaseSingleInputFieldProps<Dayjs | null, Dayjs, FieldSection, false, DateValidationError> {
  calendarSetOpen?: Dispatch<SetStateAction<boolean>>;
  fetchTasks: () => void;
  selectedDate: Dayjs;
}

const CURRENT_MONTH_FILTER: TModelFilters = {
  pageSize: -1,
  fields: ["name", "deadline", "isComplete"],
  criteria: [
    {
      operator: "and",
      criteria: [
        {
          fieldName: "saleOrder.id",
          operator: "=",
          value: 1,
        },
        {
          operator: "between",
          fieldName: "deadline",
          value: dayjs().startOf("month").toISOString(),
          value2: dayjs().endOf("month").toISOString(),
        },
      ],
    },
  ],
};

export function TaskListCard() {
  const orderUserTaskStore = useOrderUserTaskStore((state) => state);
  const [filters, setFilters] = useState<TModelFilters>(CURRENT_MONTH_FILTER);
  const [tasks, setTasks] = useState<TOrderUserTaskModel[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TOrderUserTaskModel[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [taskLoading, setTaskLoading] = useState(new Set<number | undefined>());
  const [highlightedDays, setHighlightedDays] = useState<Dayjs[]>([]);
  const [calendarOpen, calendarSetOpen] = useState(false);

  const highlightDays = () => {
    setHighlightedDays(tasks.map((task: TOrderUserTaskModel) => dayjs(task.deadline)));
  };

  const handleMonthChange = (month: any) => {
    setSelectedDate(dayjs(month));
    setFilters({
      pageSize: -1,
      fields: ["name", "deadline", "isComplete"],
      criteria: [
        {
          operator: "and",
          criteria: [
            {
              fieldName: "saleOrder.id",
              operator: "=",
              value: 1,
            },
            {
              operator: "between",
              fieldName: "deadline",
              value: dayjs(month).startOf("month").toISOString(),
              value2: dayjs(month).endOf("month").toISOString(),
            },
          ],
        },
      ],
    });
  };

  const toggleTaskCheckbox = async (value?: TOrderUserTaskModel) => {
    if (!value || taskLoading.has(value.id)) return;

    setTaskLoading(taskLoading.add(value.id));

    await orderUserTaskStore.complete(value);

    setTasks(tasks.map((task) => (task.id === value.id ? { ...task, isComplete: !task.isComplete } : task)));

    taskLoading.delete(value.id);
    setTaskLoading(taskLoading);
  };

  const filterTasks = (date: Dayjs | null) => {
    const _tasks = tasks.filter((task) => dayjs(task.deadline).isSame(date, "day"));
    _tasks.sort((a, b) => (a.isComplete === b.isComplete ? 0 : a.isComplete ? 1 : -1));
    setFilteredTasks(_tasks);
  };

  const fetchTasks = () => {
    orderUserTaskStore.fetch(filters).then((data) => data && setTasks(data));
  };

  useEffect(() => {
    filterTasks(selectedDate);
    highlightDays();
  }, [tasks]);

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <CheckBoxIcon sx={{ color: "primary.main", mr: 1, my: 0.5 }} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            defaultValue={dayjs()}
            onMonthChange={handleMonthChange}
            onAccept={(date) => {
              if (date) {
                filterTasks(date);
                setSelectedDate(date);
              }
            }}
            open={calendarOpen}
            loading={orderUserTaskStore.loading}
            renderLoading={() => <DayCalendarSkeleton />}
            onClose={() => calendarSetOpen(false)}
            onOpen={() => calendarSetOpen(true)}
            slots={{ textField: TaskTextField, day: HighlightedDay }}
            slotProps={{
              day: { highlightedDays } as any,
              field: { calendarSetOpen, fetchTasks, setTasks, tasks, selectedDate } as any,
            }}
          />
        </LocalizationProvider>
      </Box>

      <Box>
        <List
          sx={{
            width: "100%",
            overflow: "auto",
            maxHeight: 130,
            "&::-webkit-scrollbar": { width: "0.3em" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "rgba(0,0,0,.1)" },
          }}
        >
          {filteredTasks.map((value) => {
            return (
              <ListItem key={`task-${value.id}`} disablePadding>
                <ListItemButton role={undefined} onClick={() => toggleTaskCheckbox(value)} dense>
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    {taskLoading.has(value.id) ? (
                      <CircularProgress size={20} sx={{ mr: 1, my: 0.1 }} />
                    ) : (
                      <Checkbox
                        edge="start"
                        sx={{ minWidth: 0, py: 0 }}
                        checked={value.isComplete}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": `checkbox-list-label-${value.id}` }}
                      />
                    )}
                  </ListItemIcon>
                  <Box
                    sx={{ fontSize: 14, color: "#45464E", width: "100%" }}
                    justifyContent="space-between"
                    display="flex"
                  >
                    <Tooltip title={value.name} enterDelay={1000}>
                      <Typography
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          width: "250px",
                          textOverflow: "ellipsis",
                        }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {value.name}
                      </Typography>
                    </Tooltip>
                    <Typography component="span" variant="body2" color="text.primary">
                      {dayjs(value.deadline).format("DD.MM.YYYY")}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {filteredTasks.length === 0 && selectedDate ? (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Нет задач на этот день
            </Typography>
          </Box>
        ) : (
          selectedDate === null && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Выберите день
              </Typography>
            </Box>
          )
        )}
      </Box>
    </>
  );
}

function TaskTextField(props: TaskTextFieldProps) {
  const { calendarSetOpen, fetchTasks, selectedDate, InputProps: { ref } = {} } = props;
  const [inputValue, setInputValue] = useState("");
  const orderUserTaskStore = useOrderUserTaskStore((state) => state);

  const handleAddTask = async () => {
    if (selectedDate && selectedDate.isBefore(dayjs(), "day")) {
      // TODO: show error message
      return;
    }

    if (orderUserTaskStore.loading) {
      // TODO: show error message
      return;
    }

    if (inputValue !== "") {
      const newTask = {
        name: inputValue.trim(),
        deadline: selectedDate.toDate(),
        isComplete: false,
      } as TOrderUserTaskModel;

      const task = await orderUserTaskStore.store(1, newTask);

      if (task) {
        fetchTasks();
        setInputValue("");
      } else {
        // TODO: show error message
      }
    }
  };

  return (
    <TextField
      placeholder="Создать задачу..."
      variant="standard"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
      sx={{ width: "100%" }}
      InputProps={{
        endAdornment: (
          <>
            <InputAdornment position="end">
              <>{orderUserTaskStore.loading ? <CircularProgress color="inherit" size={20} /> : null}</>
            </InputAdornment>
            <InputAdornment position="end">
              <IconButton ref={ref} aria-label="send button" onClick={() => calendarSetOpen && calendarSetOpen(true)}>
                <CalendarMonthIcon sx={{ color: "secondary.light" }} fontSize="small" />
              </IconButton>
            </InputAdornment>
            <InputAdornment position="end">
              <IconButton aria-label="send button" onClick={handleAddTask}>
                <SendIcon sx={{ color: "secondary.light" }} fontSize="small" />
              </IconButton>
            </InputAdornment>
          </>
        ),
      }}
    />
  );
}

function HighlightedDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected = highlightedDays.some((date) => dayjs(date).isSame(day, "day"));

  return (
    <Badge key={props.day.toString()} color="primary" variant="dot" invisible={!isSelected}>
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}
