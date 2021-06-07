CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    firstName VARCHAR (256),
    lastName VARCHAR (256),
    dateOfBirth VARCHAR (256),
    image VARCHAR (256),
    passWord VARCHAR (256),
    email VARCHAR (256),
    phoneNumber VARCHAR (256),
    useraname VARCHAR (256),
    role VARCHAR (256),
    country VARCHAR (256)
);

CREATE TABLE IF NOT EXISTS institute(
    id INT SERIAL PRIMARY KEY ,
    name VARCHAR (256),
    address VARCHAR (256),
    password VARCHAR (256),
    username VARCHAR (256),
    role VARCHAR (256),
    phoneNumber VARCHAR (256),
    email VARCHAR (256)
);

CREATE TABLE IF NOT EXISTS procedures(
    id SERIAL PRIMARY KEY,
    time VARCHAR (256),
    date VARCHAR (256)
);

CREATE TABLE IF NOT EXISTS therapy(
    id SERIAL PRIMARY KEY,
    name VARCHAR (256),
    position VARCHAR (256),
    price FLOAT
);

CREATE TABLE IF NOT EXISTS radio(
    id SERIAL PRIMARY KEY,
    type VARCHAR (256),
    position VARCHAR (256),
    price FLOAT,
    expextedTime VARCHAR (256)
);

CREATE TABLE IF NOT EXISTS lab(
    id SERIAL PRIMARY KEY,
    name VARCHAR (256),
    price FLOAT,
    expextedTime VARCHAR (256)
);

CREATE TABLE IF NOT EXISTS drug(
    id SERIAL PRIMARY KEY,
    name VARCHAR (256),
    route VARCHAR (256),
    dose VARCHAR (256),
    takenPerTime VARCHAR (256),
    times INT,
    price FLOAT,
    period VARCHAR (256)
);

CREATE TABLE IF NOT EXISTS patient(
    insuranceState boolean,
    insuranceCompID INT REFERENCES insuranceCom(id),
    userId UNIQUE REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS doctor(
    userId INT UNIQUE REFERENCES user(id),
    location VARCHAR (256),
    specialty VARCHAR (256),
    yearsOfExp INT
);

CREATE TABLE IF NOT EXISTS diagnosis(
    id SERIAL PRIMARY KEY,
    doctorId INT REFERENCES doctor(id),
    patientId INT REFERENCES patient(id),
    date VARCHAR (256),
    time VARCHAR (256),
    diagnosis TEXT,
    symptoms TEXT,
    signs TEXT,
    period VARCHAR (256)
);

CREATE TABLE IF NOT EXISTS visit(
    id SERIAL PRIMARY KEY,
    patientId INT REFERENCES patient(id),
    doctorId INT REFERENCES doctor(id),
    diagnosisId INT REFERENCES diagnosis(id),
    procedureId INT REFERENCES procedures(id)
);

CREATE TABLE IF NOT EXISTS drugProcedure(
    procedureId INT REFERENCES procedures(id),
    drugId INT REFERENCES drug(id),
    status VARCHAR (256),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS labProcedure(
    procedureId INT REFERENCES procedures(id),
    testId INT REFERENCES lab(id),
    startTime VARCHAR (256),
    endTime VARCHAR (256),
    status VARCHAR (256),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS radioProcedure(
    procedureId INT REFERENCES procedures(id),
    radioId INT REFERENCES radio(id),
    startTime VARCHAR (256),
    endTime VARCHAR (256),
    status VARCHAR (256),
    notes TEXT
);

CREATE TABLE IF NOT EXISTS therapyProcedure(
    procedureId INT REFERENCES procedures(id),
    therapyId INT REFERENCES therapy (id),
    startTime VARCHAR (256),
    endTime VARCHAR (256),
    status VARCHAR (256),
    notes TEXT
);