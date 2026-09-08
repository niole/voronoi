import random
import string
random_string = ''.join(random.choice(string.ascii_letters) for _ in range(3))
import mlflow.sklearn
from mlflow.store.artifact.runs_artifact_repo import RunsArtifactRepository
from mlflow import MlflowClient
from sklearn.ensemble import RandomForestRegressor

client = MlflowClient()

# Register model name in the model registry
name = "RandomForestRegression_" + random_string
registered_model = client.create_registered_model(name)

# create an experiment run in MLflow
params = {"n_estimators": 3, "random_state": 42}
rfr = RandomForestRegressor(**params).fit([[0, 1]], [1])
# Log MLflow entities
with mlflow.start_run() as run:
    mlflow.log_params(params)
    model_info = mlflow.sklearn.log_model(rfr, artifact_path="sklearn-model")
    runs_uri = model_info.model_uri
    print("runs_uri")
    print(runs_uri)
    print("runs_uri")

    # Create a new model version of the RandomForestRegression model from this run
    desc = "A testing version of the model"
    #model_src = RunsArtifactRepository.get_underlying_uri(runs_uri)
    mv = client.create_model_version(name, runs_uri, run.info.run_id, description=desc)
    print("Name: {}".format(mv.name))
    print("Version: {}".format(mv.version))
    print("Description: {}".format(mv.description))
    print("Status: {}".format(mv.status))
    print("Stage: {}".format(mv.current_stage))
print("You created your first registered model!")
print(f"Go to the Models UI and click on the {name} model to see the Model Card.")
