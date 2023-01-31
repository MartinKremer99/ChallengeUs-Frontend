import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600">
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">Help</h5>
        <div>
          <Link href="/help/faq">FAQ</Link>
        </div>
        <div>
          <Link href="/help/contact">Contact us</Link>
        </div>
        <div>
          <Link href="/help/returnPolicy">Return Policy</Link>
        </div>
        <div>
          <Link href="/help/cookiePolicy">Cookie Policy</Link>
        </div>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">Follow Us</h5>
        <div>Twitter</div>
        <div>Youtube</div>
        <div>Instagram</div>
        <div>Facebook</div>
      </div>

      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">About</h5>
        <div>
          <Link href="/about/legalInfo">Legal Info</Link>
        </div>
        <div>
          <Link href="/about/contactUs">Contact Us</Link>
        </div>
        <div>
          <Link href="/about/contactUs">Terms & Conditions</Link>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Footer;
