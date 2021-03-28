import sirv from 'sirv';
import polka from 'polka';
const PORT = process.env.PORT || 5000

const assets = sirv('build', {
  maxAge: 31536000, // 1Y
  immutable: true
});

polka()
  .use(assets)
  .listen(PORT);