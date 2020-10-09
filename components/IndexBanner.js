import {Button} from 'react-bootstrap'
import Link from 'next/link'

export default function IndexBanner() {
    return (
        <React.Fragment>
        <div className="webban">
            <center><img class="webanner" src="https://i.imgur.com/2QSRBu7.png" /></center>
        </div>
        <div className="mobban">
            <center><img class="mobanner" src="https://i.imgur.com/pOz7SAl.png" /></center>
        </div>
        </React.Fragment>
    )
}