import React from 'react';
import './Footer.css';
import logoUrl from './images/label_footer.png';
import { Component } from 'react';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <footer>
                    <div id="footer_copyright">
                        Ставки на спорт. Иванин. 2023
                    </div>
                </footer>
            </div>
        );
    }
}
export default Footer;

