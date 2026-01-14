cd ../sit-madrid-output

# Request commit message
echo "Enter commit message: "
read commit_message

# Initialise repo
git init
git add *
git commit -m "$commit_message"

# Rebase from origin
git config pull.rebase true
git remote add origin git@github.com:ajmaradiaga/sit-madrid.git
git pull origin main
git rebase -X theirs main

####################
# Resolve conflicts
####################

# Ask the user if they want to open VS Code to resolve conflicts
echo "Do you want to open VS Code to resolve conflicts? (y/n): "
read open_vscode

if [ "$open_vscode" = "y" ]; then
    code ../sit-madrid-output
fi
