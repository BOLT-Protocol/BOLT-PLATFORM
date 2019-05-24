import React, { Fragment } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import '../styles/layout.sass';

const layout = props => (
	<Fragment>
		<header>
			<nav>
				<ul>
					<li>
						<Link href="/index" as="/">
							<a>Index</a>
						</Link>
					</li>

					<li>
						<Link href="/nasa">
							<a>Fetch Data</a>
						</Link>
					</li>

					<li>
						<Link href="/i18nSample">
							<a>i18nSample</a>
						</Link>
					</li>
				</ul>
			</nav>
		</header>
		{/* eslint-disable-next-line react/destructuring-assignment */}
		{props.children}
	</Fragment>
);

layout.propTypes = {
	children: PropTypes.object.isRequired
};

export default layout;
