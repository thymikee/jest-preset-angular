import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

const features = [
    {
        title: 'Easy to Use',
        description: <>Jest presets to let you start quickly with testing.</>,
    },
    {
        title: 'View Engine/Ivy',
        description: <>Support both Angular View Engine and Angular Ivy.</>,
    },
    {
        title: 'Babel support',
        description: <>Support working in combination with Babel</>,
    },
];

function Feature({ imageUrl, title, description }) {
    const imgUrl = useBaseUrl(imageUrl);

    return (
        <div className={clsx('col', styles.section)}>
            {imgUrl && (
                <div className="text--center">
                    <img className={styles.featureImage} src={imgUrl} alt={title} />
                </div>
            )}
            <h3 className={clsx(styles.featureHeading)}>{title}</h3>
            <p className="padding-horiz--md">{description}</p>
        </div>
    );
}

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig: { tagline } = {} } = context;

    return (
        <Layout title={tagline} description={tagline}>
            <header>
                <div className={styles.hero}>
                    <div className={styles.heroInner}>
                        <h1 className={styles.heroProjectTagline}>
                            <img
                                alt={translate({ message: 'Docusaurus with Keytar' })}
                                className={styles.heroLogo}
                                src={useBaseUrl('/img/logo.svg')}
                            />
                            <span className={styles.heroTitleTextHtml}>
                                Delightful testing with <b>Jest</b> and <b>Angular</b>
                            </span>
                        </h1>
                        <div className={styles.indexCtas}>
                            <Link className={clsx('button button--primary button--lg')} to={useBaseUrl('docs/')}>
                                Get Started
                            </Link>
                            <span className={styles.indexCtasGitHubButtonWrapper}>
                                <iframe
                                    className={styles.indexCtasGitHubButton}
                                    src="https://ghbtns.com/github-btn.html?user=thymikee&amp;repo=jest-preset-angular&amp;type=star&amp;count=true&amp;size=large"
                                    width={160}
                                    height={30}
                                    title="GitHub Stars"
                                />
                            </span>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.announcement, styles.announcementDark)}>
                    <div className={styles.announcementInner}>
                        Angular Ivy? Check out our <Link to="/docs/guides/angular-ivy">Angular Ivy guidance</Link>.
                    </div>
                    <div className={styles.announcementInner}>
                        Migrate to Angular {'>'}=13? Check out our{' '}
                        <Link to="/docs/guides/angular-13+">Angular {'>'}=13 guidance</Link>.
                    </div>
                </div>
            </header>
            <main>
                {features?.length && (
                    <section className={styles.section}>
                        <div className="container text--center">
                            <div className="row">
                                {features.map((props, idx) => (
                                    <Feature imageUrl={''} key={idx} {...props} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </Layout>
    );
}

export default Home;
