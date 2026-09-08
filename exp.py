import mlflow

experiment_id = mlflow.create_experiment(
  "my-experiment-name",
  tags={"version": "v1", "priority": "P1"},
)

with mlflow.start_run(experiment_id=experiment_id):
  mlflow.log_param("hello", "mlflow")
