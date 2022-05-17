# Workspace

## VS Code

1. Install "Remote development" extension.
2. Copy everything from <code>/parentDir/CudosBuilders/workspace</code> to <code>parentDir</code>
3. Rename/copy <code>parentDir/.devcontainer/.env.example</code> to <code>parentDir/.devcontainer/.env</code>. There are 7 parameters that you must specify:

        3.1. MNT_PATH - This is the exact path there <code>parentDir</code> is located in the host. Open it in shell and run <code>pwd</code>. The result of the command is the value of MNT_PATH.
        3.2. PASS - This is the password which will be used inside dev container for both root and your accounts.
        3.3. USER_ID - Id of your host's account
        3.4. USER_NAME - Name of your host's account
        3.5. GROUP_ID - Id of your host's account's group
        3.6. GROUP_NAME - Name of your host's account's group
        3.7. DOCKER_GROUP_ID - Id of docker's group from the host
       
4. Open cudos.code-workspace located in <code>parentDir</code>
5. Open View -> Command pallete and type "Reopen in container".

Now your VS Code should reopen and start building the devcontainer. It could take some time. Once it is ready you will see in bottom-left corner the following label "Dev Container: cudos-workspace". In this devcontainer you have already installed Go, Rust, Docker, Docker compose, NodeJs.

## Non-VS Code

1. Copy .dockerignore from <code>/parentDir/CudosBuilders/workspace</code> to <code>parentDir</code> 
2. Install correspoding framework/langage that you are going to use (depends on project). You might need Go, Rust or NodeJs.
