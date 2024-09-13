# Etapa base
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Etapa build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copie e restaure dependências
COPY ["To-Do List.csproj", "."]
RUN dotnet restore "./To-Do List.csproj"

# Instale dotnet-ef
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Copie o restante do código e compile
COPY . .
WORKDIR "/src/."
RUN dotnet build "./To-Do List.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Execute as migrations antes de publicar
RUN dotnet-ef migrations add Initialmigration
RUN dotnet-ef database update

# Etapa publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./To-Do List.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Etapa final
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "To-Do List.dll"]