import { ListDisplay } from '../../helpers';

export default function Dashboard() {

    let data = [
        {name: 'Something', progress: '70%'},
        {name: 'You', progress: '0%'},
        {name: 'Me', progress: '100%'}
    ]

    let content = data.map(datum => {
        return <ListDisplay name={datum.name} progress={datum.progress} />
    })

    return (
        <div className="page">
            <h1>Content</h1>
            <h1>More Content</h1>
            <button>Fuck it! A Button</button>
            {/* probably need some copy above here as well as some form of toolbar */}
            {content}
        </div>
    )
};