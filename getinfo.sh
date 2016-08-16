#!/usr/bin/bash

upout=$(uptime)

nvidia-smi | grep Default  | awk '{print $9 " " $11 " " $13}' > /sysmon/gpuinfo
free | grep : > /sysmon/meminfo
echo "$upout" | awk '{print $10 $11 $12}' > /sysmon/cpuinfo
df -h | grep ^/dev | awk '{print $2 " " $3 " " $4 " " $5}' > /sysmon/diskinfo
echo "$upout" | awk '{print $6}' > /sysmon/userinfo

