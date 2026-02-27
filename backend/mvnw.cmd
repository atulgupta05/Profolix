@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF)
@REM Maven Wrapper startup batch script
@REM ----------------------------------------------------------------------------

@IF "%DEBUG%"=="" @ECHO OFF
@setlocal

set WRAPPER_JAR="%~dp0\.mvn\wrapper\maven-wrapper.jar"
set WRAPPER_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"

@REM Check if wrapper jar exists, download if not
if not exist %WRAPPER_JAR% (
    echo Downloading Maven Wrapper...
    powershell -Command "(New-Object Net.WebClient).DownloadFile('%WRAPPER_URL:"=%', '%WRAPPER_JAR:"=%')"
)

set MAVEN_PROJECTBASEDIR=%~dp0
set MAVEN_CMD_LINE_ARGS=%*

@REM Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if %ERRORLEVEL% equ 0 goto execute

echo Error: JAVA_HOME is not set and no 'java' command could be found.
goto error

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe
if exist "%JAVA_EXE%" goto execute

echo Error: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
goto error

:execute
@REM Download Maven if needed
set MAVEN_HOME=%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.6
if not exist "%MAVEN_HOME%\bin\mvn.cmd" (
    echo Downloading Apache Maven 3.9.6...
    set MVN_ZIP=%TEMP%\apache-maven-3.9.6-bin.zip
    powershell -Command "(New-Object Net.WebClient).DownloadFile('https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip', '%MVN_ZIP%')"
    powershell -Command "Expand-Archive -Path '%MVN_ZIP%' -DestinationPath '%USERPROFILE%\.m2\wrapper\dists' -Force"
)

"%MAVEN_HOME%\bin\mvn.cmd" %MAVEN_CMD_LINE_ARGS%
if %ERRORLEVEL% neq 0 goto error
goto end

:error
set ERROR_CODE=1

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%
cmd /C exit /B %ERROR_CODE%
