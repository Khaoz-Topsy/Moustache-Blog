I recently tried setting up an Azure DevOps agent on my Ubuntu 22.04 Digital Ocean droplet and got stuck with an error message of `No usable version of libssl was found`. This is a problem with the Azure DevOps agent, but I did find a workaround and I thought I would share it. 

### Workaround

Download `libssl1` from security.ubuntu.com
```bash
wget 'http://security.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb'
```

Install the package
```bash
sudo dpkg -i 'libssl1.1_1.1.1f-1ubuntu2_amd64.deb'
```

Delete the package file
```bash
rm 'libssl1.1_1.1.1f-1ubuntu2_amd64.deb'
```

Then run:
```bash
sed -i 's/openssl_conf = openssl_init/#openssl_conf = openssl_init/g' /etc/ssl/openssl.cnf
```

<br />

_If the above is not working for you, you may need to replace `libssl1.1_1.1.1f-1ubuntu2_amd64.deb` with a different `.deb` package which you can find [here](http://security.ubuntu.com/ubuntu/pool/main/o/openssl/) and search for `libssl1.`_

### What is the actual issue?

It appears that the Azure agent installer makes use of `libssl1` to communicate with Azure DevOps however the installer does not come with `libssl1` and Ubuntu 22.04 comes with `libssl3`. So until the Azure DevOps agent installer is either updated to make use of the later version or comes with a pre-packaged `libssl`, this workaround will be required.

### Links

[The issue is tracked and can be found here](https://github.com/microsoft/azure-pipelines-agent/issues/3834) \
[Studyraft blog post about this issue](https://studyraft.com/azure-devops-agent-no-usable-version-of-libssl-was-found/)

