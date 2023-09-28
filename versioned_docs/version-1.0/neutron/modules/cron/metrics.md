# Metrics

Cron module collects these metrics:
- `execute_ready_schedules` - [hist] how long it takes to execute all ready schedules in EndBlocker
- `schedule_count` - [gauge] how many schedules do we currently have
- `schedule_executions_count` - [counter] counts each schedule executions labeled by success result and schedule name
