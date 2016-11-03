import 'scripts/libraries/sizmek/EBClickthrough';
import vars from 'scripts/variables';

(function iife(Timeline, Tween) {
    Tween.defaultEase = window[vars.defaultEase];

    const timelineBG = new Timeline({
        delay: 0.5,
    });

    timelineBG.from(`${vars.idLabel}__bg`, 1.5, { opacity: 0 }, 'bg');

    const timelineMain = new Timeline({
        //
    });

    const frame1 = () => new Timeline();

    timelineMain
        .add(frame1(), '+=3');
}(window.TimelineMax, window.TweenMax));
