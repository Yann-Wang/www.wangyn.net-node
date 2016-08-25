## www.wangyn.net-node

- This project is the server program of my blog website.

- the front end program generator is displayed by the project [www.wangyn.net-hexo](https://github.com/Yann-Wang/www.wangyn.net-hexo).

### usage

```shell
cd www.wangyn.net-node
node ./bin/www
```

### deploy

```shell
git add --all
git commit -m "deploy"
git push
fly production
```

### features
- use flightplan to make automatic deployment.