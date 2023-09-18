import Game from './javascripts/Game';

const init = ({
  images,
  sounds,
  canvasElement,
  onEnd,
  onInterrupt,
}) => {
  const game = new Game({
    canvas: canvasElement,
    images,
    sounds,
    onEnd,
    onInterrupt,
  });

  game.init();
}

export default init;

