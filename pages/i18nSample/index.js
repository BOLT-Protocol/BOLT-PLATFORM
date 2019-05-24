import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { withNamespaces, i18n } from '../../i18n';

const i18nSample = props =>
{
    const { t } = props;
    return (
        <div>
            <Link href="/index" as="/">
                <a>Index</a>
            </Link>

            <a
                onClick={() =>
                {
                    i18n.changeLanguage(i18n.language === 'tw' ? 'en' : 'tw');
                }}
            >
                {t('foo')}
            </a>

            <div>
                {i18n.language}
            </div>
        </div>
    );
};

i18nSample.propTypes = {
    t: PropTypes.func.isRequired
};

i18nSample.getInitialProps = () =>
{
    return {
        namespacesRequired: ['i18nSample']
    };
};

export default withNamespaces('i18nSample')(i18nSample);
