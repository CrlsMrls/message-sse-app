https://cloud.google.com/sdk/docs/cheatsheet

```
gcloud compute networks create test-vpc \
 --subnet-mode=auto \
 --bgp-routing-mode=regional

gcloud compute networks create test-vpc \
 --project=level-sol-303212 \
 --description=shared\ VPC\ for\ connecting\ to\ SQL \
 --subnet-mode=custom \
 --mtu=1460 \
 --bgp-routing-mode=regional

gcloud compute --project=level-sol-303212 firewall-rules create sql-connection \
 --network=test-vpc \
 --direction=INGRESS \
 --priority=1000 \
 --network=test-vpc \
 --action=ALLOW \
 --rules=TCP:3306

gcloud compute networks list

gcloud compute networks describe test-vpc
gcloud compute networks subnets list --network=test-vpc

gcloud compute networks subnets list \
 --filter="region:europe-west1"

gcloud compute networks subnets list \
 --filter="region:europe-west1" \
 --network=test-vpc

gcloud compute firewall-rules list \
 --filter network=test-vpc \
 --format=json
```
