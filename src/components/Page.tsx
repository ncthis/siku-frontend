import * as React from 'react';

const Page: React.StatelessComponent<{}> = ({children}) =>
    <div className={'ui basic padded segment'}>{children}</div>;

export default Page;
