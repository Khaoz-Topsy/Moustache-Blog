How I regained access to my Digital Ocean Droplet 💧

One evening I was messing around with adding SSH connections to [mRemoteNG](https://mremoteng.org/) which is a great tool for people who remote desktop or SSH into machines regularly. Long ago I had generated an SSH key pair and added the public key onto a few of the services I regularly use such as (GitHub or Azure Repos). My private key was saved in a format that Putty could not understand. Following a guide, I imported my private key and converted it to the right format, saved the converted key to a new file and successfully connected to a Raspberry Pi via SSH in [mRemoteNG](https://mremoteng.org/) 🎉🥳.

That was a Friday, on Monday I was tapping away on my keyboard not knowing the headache I was about to have. I got to a logical stop, typed `git push` ...

<strong style="color: red">Please make sure you have the correct access rights and the repository exists.</strong>

I was quite confused, but right below the command a message told me that my private key could not be read and therefore was not being used. I navigated to the private key and viewed it. Immediately my heart sank 💔. I could see that when I converted my private key to a format Putty could understand, it changed the file.

It might be time to swap out my SSH keys...

## Generating SSH key pair
- Open up a terminal and type `ssh-keygen -t rsa -b 4096`
- Answer the questions that come up (it is okay to just keep hitting enter)


## Setting up your key on Digital Ocean
- Copy the contents of your public key's file ({HomeFolder}/.ssh/{keyName}.pub)
- Go to the [Security Section](https://cloud.digitalocean.com/account/security)
- Paste the SSH key
- Click "Add SSH Key"


## Adding your key to a Droplet 💧
If you now create a Droplet it will already have your SSH key in its `authorized_keys` file meaning that you can SSH in to you Droplet by type `ssh root@0.0.0.0` into your terminal (replacing `0.0.0.0` with your Droplet's IP address).

If you already have a Droplet you will have to SSH into it using whichever method you used before and add your SSH key to its `authorized_keys` file manually. [This is a very good guide](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/to-existing-droplet/).

If you already have a Droplet and you are no longer able to SSH into it because you no longer have a usable private key (like the situation described above). It is going to be a bit trickier.

## Last ditch attempt to add the key
Digital Ocean luckily has a button to launch a Console Window connected to your Droplet that you can use almost the same way that you would use your terminal connected via SSH to the Droplet. I unfortunately had a problem with this browser Console Window. When pasting my SSH key the Console would print the first few characters correctly and then it would start pasting special characters which were not present in the original. 

To solve this, open the file `/etc/ssh/sshd_config` using the Console and change the value `PasswordAuthentication` to `yes`. Restart the server and you will be able to log into your Droplet using Password Authentication. Then you can follow `this very good guide` to add your new SSH key. Restart the server again once you are done.

And now you should be able to access your Digital Ocean Droplet via SSH using the private key you have just set up 🎉.
 