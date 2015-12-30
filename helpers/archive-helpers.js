/*
1. Checks the companies table within db
2. For each company entry whose archived column is false
	a. request from stackshare.io/companyname/companyname
	b. request from stackshare.io/companyname/tech-stack
	c. parseForTechnologies(results)
	d. store technologies in technologies table in db
	e. update technologies_whatever joint table

*/