import HeroStage from './hero/HeroStage';
import HeroBackground, { type Slide } from './hero/HeroBackground';
import HeroCopy from './hero/HeroCopy';
import HeroRail, { type RailLink } from './hero/HeroRail';
import './hero/hero.css';

/*
  Homepage hero: "Golden Hour". A slow crossfading slideshow of real Bustos Landscaping
  project photos (reused with the owners' authorization from bustoslandscaping.net), quiet
  editorial type over it, and a service rail. Normal document scroll, no pinning.
*/
const slides: Slide[] = [
  { src: '/assets/hero/slides/slide-backyard-lawn-patio.jpg', blur: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAYACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDpZ9YRCVtYXuGBwSowoP1p/wDacqxhrtfLDfdKAn8DWQlzafakcCWONYymwKCD79auRf2W/wDy+EcdGLA/rUqqnsxaFl9QtprGVlneHcrKHkXG07Sc49Kx9E1bS9F0WNZXMk0jFpPLj59MnNN8QWlnDYGeC5kkbcFGW3DB6/pXKG5mE72iFRJESqnPWhyl0BrS50BIzjtRhccGiiuCwijqS4jVc/ePaszUYTJDBeoDnaYpMdmHQ/iKKK6aWxql7h//2Q==', position: '38% 62%', portraitPosition: '30% 60%', drift: [-1.6, -1.2] },
  { src: '/assets/hero/slides/slide-turf-concrete-patio.jpg', blur: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAVACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDp9PvLa9gk4id4ztby3B5/CodTvoraG2xG8guJBE3IG0HuaxLTQ4ix8y9kL/xeWqrn60l94a3ugs5dydWWV+nvQ5yS2JaQzSdf0LR0mtLfzuZWPmYyG5459MUQ+MrdtReS4ULEQFyuSQBnGffmnR+E8AGaZSM8qqAfqc1ZTwxpp/gkU9/u/wCFSpTfkFkVpbya3tIyrZkfq1X7DUJ5rsQNt27Mk45JxRRVjJry+ezUkIHXdjbnFRi+8zaQhX0w3T9KKKQH/9k=', position: '55% 55%', portraitPosition: '58% 55%', drift: [1.4, -1] },
  { src: '/assets/hero/slides/slide-new-lawn-sprinklers.jpg', blur: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAYACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCp/buhyn/j5kX3MTU5b/R5Gwl8mfQqR/Ss638MWwX9/JM7dTj5RVuLSdLgyEtt2epdjitP7SkjndCI3+0V+1qscQa33bd3O5voKgkmu77UVtY7OaKInDFlI47nOK3kvZoowsb4IHHHSrujTSXeoxpO+8EE4PsKxljak/db3NI0oJ3RLcW7oQfLKluAR61Dc2UnlCSWPfGejr2ooqKsUnoXQm5wTkZjxNG33iR2P9Kv+G2H9r7ifuxMcfkKKKwt7xTVpH//2Q==', position: '50% 62%', portraitPosition: '45% 60%', drift: [-1.2, 1.2] },
];

const rail: RailLink[] = [
  { label: 'Landscape Design', href: '/services#service-0' },
  { label: 'Hardscape & Concrete', href: '/services#service-2' },
  { label: 'Irrigation', href: '/services#service-4' },
  { label: 'Outdoor Living', href: '/our-work' },
];

export default function Hero() {
  return (
    <HeroStage count={slides.length} labelledBy="hero-title">
      <HeroBackground slides={slides} />
      <HeroCopy />
      <HeroRail links={rail} />
    </HeroStage>
  );
}
