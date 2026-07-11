from fastapi import FastAPI
from sqlmodel import SQLModel, create_engine, Session, select, Field
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

class Experiment(SQLModel, table = True):
    id: Optional[int] = Field(default = None, primary_key = True)
    title: str
    date: str
    name: str

    introduction: str
    hypothesis: str
    materials: str
    method: str
    results: str
    discussion: str
    conclusion: str

sqlite_database = "database.db"
sqlite_url = f"sqlite:///{sqlite_database}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)

def create_db():
    SQLModel.metadata.create_all(engine)


app = FastAPI(title = "Hypothesis API", description = "An api for storing and retreiving scientific experiment logs")

@app.on_event("startup")
def on_startup():
    create_db()

@app.post("/experiments")
def create_experiment(experiment: Experiment):
    with Session(engine) as session:
        session.add(experiment)
        session.commit()
        session.refresh(experiment)
        return experiment
    
@app.get("/experiments")
def get_experiments():
    with Session(engine) as session:
        experiments = session.exec(select(Experiment)).all()
        return experiments