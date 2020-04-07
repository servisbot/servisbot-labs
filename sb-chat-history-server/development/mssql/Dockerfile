FROM microsoft/mssql-server-linux:2017-latest

COPY init_db.sql /opt/mssql-scripts/init_db.sql

ENV MSSQL_SA_PASSWORD=P455w0rddocker
ENV ACCEPT_EULA=Y

RUN ( /opt/mssql/bin/sqlservr --accept-eula & ) | grep -q "Service Broker manager has started" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P $MSSQL_SA_PASSWORD -i /opt/mssql-scripts/init_db.sql \
    && pkill sqlservr 