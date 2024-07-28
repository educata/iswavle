export const CODE_BLOCKS = {
  htmlCss: `<div class="code-wrapper">
  <div class="language-header">
    <span>HTML</span>
  </div>
  <pre><code class="hljs html"><span class="hljs-meta">&lt;!doctype <span class="hljs-keyword">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>ვებ გვერდის სათაური<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="language-css">
      <span class="hljs-selector-tag">h1</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#1890ff</span>;
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>სათაური<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>პარაგრაფი<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./image.png&quot;</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">&quot;სურათი&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;https://github.com/educata/iswavle&quot;</span>&gt;</span>Github<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn&quot;</span>&gt;</span>ღილაკი<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
</div>`,
  js: `<div class="code-wrapper">
  <div class="language-header">
    <span>JS</span>
  </div>
  <pre><code class="hljs js"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;გამარჯობა!&#x27;</span>);

<span class="hljs-keyword">const</span> h1 = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&#x27;h1&#x27;</span>);
<span class="hljs-keyword">const</span> btn = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&#x27;.btn&#x27;</span>);

btn.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;click&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">alert</span>(<span class="hljs-string">&#x27;ღილაკზე დაჭერის ივენთი&#x27;</span>);
  h1.<span class="hljs-property">style</span>.<span class="hljs-property">fontSize</span> = <span class="hljs-string">&#x27;22px&#x27;</span>;
  h1.<span class="hljs-property">style</span>.<span class="hljs-property">fontWeight</span> = <span class="hljs-string">&#x27;200&#x27;</span>;
  h1.<span class="hljs-property">style</span>.<span class="hljs-property">fontStyle</span> = <span class="hljs-string">&#x27;italic&#x27;</span>;
  h1.<span class="hljs-property">style</span>.<span class="hljs-property">color</span> = <span class="hljs-string">&#x27;green&#x27;</span>;
  h1.<span class="hljs-property">style</span>.<span class="hljs-property">textAlign</span> = <span class="hljs-string">&#x27;center&#x27;</span>;
  h1.<span class="hljs-property">textContent</span> = <span class="hljs-string">&#x27;ტექსტი შეიცვალა&#x27;</span>;
});</code></pre>
</div>`,
  ts: `<div class="code-wrapper"><div class="language-header">
  <span>TS</span>
</div>
<pre><code class="hljs ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Params</span> = <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;;

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ContentLoader</span>&lt;T&gt; {
  <span class="hljs-title function_">getContent</span>(<span class="hljs-attr">params</span>: <span class="hljs-title class_">Params</span>): <span class="hljs-title class_">Promise</span>&lt;T | <span class="hljs-literal">null</span>&gt;;
}

<span class="hljs-keyword">class</span> <span class="hljs-title class_">MyLoader</span> <span class="hljs-keyword">implements</span> <span class="hljs-title class_">ContentLoader</span> {
  <span class="hljs-keyword">protected</span> <span class="hljs-keyword">readonly</span> apiURL = <span class="hljs-string">&#x27;https://api.everrest.educata.dev&#x27;</span>;

  <span class="hljs-keyword">public</span> <span class="hljs-title function_">getContent</span>(<span class="hljs-attr">params</span>: <span class="hljs-title class_">Params</span>): <span class="hljs-title class_">Promise</span>&lt;T | <span class="hljs-literal">null</span>&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">fetchContentFromEverREST</span>(params);
  }

  <span class="hljs-keyword">private</span> <span class="hljs-title function_">fetchContentFromEverREST</span>(<span class="hljs-params">params</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">apiURL</span>, params);
  }
}</code></pre>
</div>`,
  angular: `<div class="code-wrapper">
  <div class="language-header">
    <span>TS</span
    >
  </div>
  <pre><code class="hljs ts"><span class="hljs-meta">@Component</span>({
  <span class="hljs-attr">selector</span>: <span class="hljs-string">&#x27;sw-home&#x27;</span>,
  <span class="hljs-attr">standalone</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">templateUrl</span>: <span class="hljs-string">&#x27;./home.component.html&#x27;</span>,
  <span class="hljs-attr">styleUrl</span>: <span class="hljs-string">&#x27;./home.component.less&#x27;</span>,
  <span class="hljs-attr">changeDetection</span>: <span class="hljs-title class_">ChangeDetectionStrategy</span>.<span class="hljs-property">OnPush</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">class</span> <span class="hljs-title class_">HomeComponent</span> {
  <span class="hljs-keyword">readonly</span> showcases = [
    {
      <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;HTML &amp; CSS&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;ვებგვერდის სტრუქტურა და სტილიზაცია&#x27;</span>,
      <span class="hljs-attr">image</span>: <span class="hljs-string">&#x27;/assets/images/html-css.png&#x27;</span>,
      <span class="hljs-attr">routerLink</span>: <span class="hljs-string">&#x27;/doc/guides/html-css&#x27;</span>,
      <span class="hljs-attr">code</span>: <span class="hljs-string">&#x27;...&#x27;</span>,
    },
    {
      <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;JavaScript&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;დინამიკურობისა და ინტერაქციულობის დასამატებლად&#x27;</span>,
      <span class="hljs-attr">image</span>: <span class="hljs-string">&#x27;/assets/images/js.png&#x27;</span>,
      <span class="hljs-attr">routerLink</span>: <span class="hljs-string">&#x27;/doc/guides/javascript&#x27;</span>,
      <span class="hljs-attr">code</span>: <span class="hljs-string">&#x27;...&#x27;</span>,
    },
    // ...
  ];
}</code></pre>
</div>`,
};
