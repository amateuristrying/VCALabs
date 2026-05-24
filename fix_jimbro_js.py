with open("script.js", "r") as f:
    js = f.read()

js = js.replace("jimbroGithubLink", "jimbroSocials")
js = js.replace("jimbro-github-link", "jimbro-socials")

with open("script.js", "w") as f:
    f.write(js)
