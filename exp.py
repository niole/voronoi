import mlflow
import random

experiment_id = mlflow.create_experiment(
  "my-experiment-name"+str(random.randint(1, 1000)),
  tags={"version": "v1", "priority": "P1"},
)

with mlflow.start_run(experiment_id=experiment_id):
  mlflow.log_param("hello", "mlflow")
