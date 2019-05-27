import { useEffect } from 'react';

const scrollListener = ({ children, events }) => {
    useEffect(() => {
        const stream = [...events].map(e => {
            if (e.ref) {
                e.pos = e.ref.current.offsetTop;
                e.height = e.ref.current.offsetHeight;
                delete e.ref;
            }

            return e;
        });

        const scrollHandler = e => {
            const y = e.currentTarget.pageYOffset;
            stream.map(s => {
                if (s.pos >= y && s.pos + s.height / 2 <= y + s.height) {
                    s.event();
                    return s;
                }
            });
        };

        window.addEventListener('scroll', scrollHandler, false);
        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return children({ style: { fontWeight: 500 } });
};

export default scrollListener;
