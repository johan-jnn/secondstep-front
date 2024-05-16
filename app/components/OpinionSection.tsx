export default function OpinionSection() {
  return (
    <div className="opinion-section">
      <script
        type="text/javascript"
        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        async
      ></script>
      <div
        className="trustpilot-widget"
        data-locale="en-US"
        data-template-id="5419b6ffb0d04a076446a9af"
        data-businessunit-id="5c9df8263ff4c4000185ea05"
        data-style-height="24px"
        data-style-width="210px"
        data-theme="light"
        data-sku="PBC2"
        data-no-reviews="hide"
        data-scroll-to-list="true"
      >
        <a
          href="https://www.trustpilot.com/review/thepetlabco.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Trustpilot
        </a>
      </div>
    </div>
  );
}
