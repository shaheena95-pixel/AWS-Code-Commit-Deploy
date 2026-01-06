# nodejs-express-on-aws-ec2
## AWS code pipeline AWS Code commit AWS Code deploy

This repo hosts the source code for my YouTube tutorial on CI/CD from Github to an AWS EC2 instance via CodePipeline and CodeDeploy (https://www.youtube.com/watch?v=Buh3GjHPmjo). This tutorial uses a node.js express app as an example for the demo.

I also created a video to talk about how to fix some of the common CodeDeploy failures I have run into (https://www.youtube.com/watch?v=sXZVkOH6hrA). Below are a couple of examples:

```
ApplicationStop failed with exit code 1
```

```
The overall deployment failed because too many individual instances failed deployment, too few healthy instances are available for deployment, or some instances in your deployment group are experiencing problems.
```

===========================

SCRIPT 1 — Manual Install (Ubuntu):

```
#!/bin/bash
set -e

echo "Updating system..."
sudo apt update -y

echo "Installing prerequisites..."
sudo apt install -y curl ca-certificates gnupg

echo "Installing Node.js 18 LTS..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

echo "Verifying Node.js installation..."
node -v
npm -v

echo "Installing Express..."
sudo npm install express

echo "Installing supporting tools (ruby, wget)..."
sudo apt install -y ruby wget

echo "Setup completed successfully!"
echo "You can now run: node app.js"
```
SCRIPT 2 — Manual Install (Amazon Linux / ec2-user):

```
#!/bin/bash
set -e

echo "Updating system..."
sudo yum update -y

echo "Installing prerequisites..."
sudo yum install -y curl ca-certificates

echo "Installing Node.js 18 LTS..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

echo "Verifying Node.js installation..."
node -v
npm -v

echo "Installing Express..."
sudo npm install express

echo "Installing supporting tools (ruby, wget)..."
sudo yum install -y ruby wget

echo "Setup completed successfully!"
echo "You can now run: node app.js"
```
SCRIPT 3 — CodeDeploy Agent (Ubuntu EC2 User Data):

```
#!/bin/bash
set -e

apt update -y
apt install -y ruby wget

cd /home/ubuntu

wget https://aws-codedeploy-us-east-1.s3.amazonaws.com/latest/install
chmod +x install
./install auto

sleep 30

systemctl restart codedeploy-agent
systemctl enable codedeploy-agent
```
SCRIPT 4 — CodeDeploy Agent (Amazon Linux EC2 User Data):

```
#!/bin/bash
set -e

yum update -y
yum install -y ruby wget

cd /home/ec2-user

wget https://aws-codedeploy-us-east-1.s3.amazonaws.com/latest/install
chmod +x install
./install auto

sleep 30

systemctl restart codedeploy-agent
systemctl enable codedeploy-agent
```
How to run it:
```
chmod +x shell.sh
./shell.sh

```

Check if CodeDeploy agent is running:
```
sudo service codedeploy-agent status
```
Verify role:
```
curl http://169.254.169.254/latest/meta-data/iam/security-credentials/
```
Expected:
```
EC2CodeDeployRole

```
Location for CodeDeploy logs:
```
/opt/codedeploy-agent/deployment-root/deployment-logs/codedeploy-agent-deployments.log
```

Uninstall CodeDeploy Agent:
```
sudo yum erase codedeploy-agent
```
