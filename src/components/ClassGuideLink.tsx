import { ScrollText } from 'lucide-react';
import { useLoadedGame } from '../data/GameDataContext';
import { useBuild } from '../state/BuildContext';
import { CLASS_GUIDE_SECTION, classGuideHref } from '../features/guides/guideLinks';
import { useClassName } from './ClassSelect';

/** Planner page header (PageHeader `help`): the section of the class guide that explains this page; none without a guide. */
export function ClassGuideLink({ section }: { section: keyof typeof CLASS_GUIDE_SECTION }) {
  const { t } = useLoadedGame();
  const { build } = useBuild();
  const className = useClassName();
  const href = classGuideHref(build.c, CLASS_GUIDE_SECTION[section]);
  if (!href) return null;
  return (
    <a className="btn ghost sm" href={href}>
      <ScrollText size={15} aria-hidden /> {t('lpClassGuide', { cls: className(build.c) })}
    </a>
  );
}
