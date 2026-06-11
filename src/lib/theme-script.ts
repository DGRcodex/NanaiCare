import { COLOR_ROLE_KEYS, NANAI_THEMES } from "@/lib/themes";

const themeMap = Object.fromEntries(
  NANAI_THEMES.map((theme) => [
    theme.id,
    {
      c: COLOR_ROLE_KEYS.map((role) => theme.colors[role]),
      h: theme.fonts.headingVar,
      b: theme.fonts.bodyVar,
    },
  ]),
);

/** Inline script — runs before paint to avoid theme flash */
export const themeInitScript = `(function(){
  var k='nanaicare-theme';
  var themes=${JSON.stringify(themeMap)};
  var id=localStorage.getItem(k)||'amma';
  var t=themes[id]||themes['amma'];
  var r=document.documentElement;
  r.dataset.theme=id;
  var n=['canvas','blush','rose','sage','ink','accent'];
  t.c.forEach(function(v,i){r.style.setProperty('--nanai-'+n[i],v);});
  r.style.setProperty('--font-theme-heading','var('+t.h+'),system-ui,sans-serif');
  r.style.setProperty('--font-theme-body','var('+t.b+'),system-ui,sans-serif');
})();`;
