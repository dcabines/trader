import sirv from 'sirv';
import polka from 'polka';

const assets = sirv('build', {
  maxAge: 31536000, // 1Y
  immutable: true
});

polka()
  .use(assets)
  .listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on localhost:3000~!');
  });