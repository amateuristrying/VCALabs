import re

def update_html():
    with open("index.html", "r") as f:
        html = f.read()
    
    # Don't add if already there
    if "id=\"section-kylo\"" in html: return
    
    kylo_html = """
    </section>

    <!-- SCREEN 11: KYLO (x:100vw, y:500vh) -->
    <section class="snap-section" id="section-kylo">

      <!-- Video 11 Background -->
      <div class="video-background-container" id="video-container-kylo">
        <video 
          class="bg-video" 
          id="bg-video-kylo" 
          muted 
          loop 
          playsinline 
          preload="auto">
          <source src="Kylo.mp4" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <div class="video-overlay" id="overlay-shield-kylo"></div>
      </div>

      <!-- Pure White Centered Minimal Product Details Overlay -->
      <div class="kylo-content" id="kylo-content">
        <div class="glass-card-wrapper" id="kylo-positioner">
          <div class="glass-card" id="kylo-card">
            <h2 class="kylo-heading" id="kylo-heading">kylo</h2>
            <p class="kylo-subtext" id="kylo-subtext">
              intelligent scheduling and deep focus.
            </p>
          <!-- Social Links -->
          <div class="social-links-wrapper" id="kylo-socials">
            <a href="#" class="social-link" aria-label="Website">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </a>
            <a href="#" class="social-link" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="Reddit">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.12c0 1.258 1.026 2.277 2.287 2.277 1.26 0 2.28-1.019 2.28-2.277 0-1.258-1.02-2.278-2.28-2.278-.962 0-1.782.593-2.125 1.442l-4.526-1.06a.717.717 0 0 0-.85.508l-1.706 5.373c-2.825.045-5.385.834-7.25 2.073-.483-.484-1.155-.783-1.895-.783-1.465 0-2.657 1.186-2.657 2.645 0 .971.523 1.815 1.3 2.253-.021.173-.031.35-.031.528 0 3.493 4.54 6.331 10.136 6.331 5.594 0 10.134-2.838 10.134-6.331 0-.179-.011-.355-.031-.529.776-.438 1.299-1.282 1.299-2.253zm-19.165 1.194c0-.756.617-1.371 1.374-1.371.288 0 .548.089.764.242-1.096.837-1.821 1.884-2.039 3.037-.058-.255-.099-.516-.099-.785zm5.553 4.603c-1.332 0-2.627-.193-3.619-.512a.637.637 0 0 1-.444-.795.636.636 0 0 1 .792-.444c.833.267 2.015.467 3.271.467 1.257 0 2.438-.2 3.271-.467a.636.636 0 0 1 .792.444.637.637 0 0 1-.444.795c-.992.319-2.287.512-3.619.512zm-1.867-2.68c-.768 0-1.391-.624-1.391-1.393 0-.768.623-1.392 1.391-1.392.768 0 1.392.624 1.392 1.392 0 .769-.624 1.393-1.392 1.393zm6.657 0c-.768 0-1.391-.624-1.391-1.393 0-.768.623-1.392 1.391-1.392.768 0 1.392.624 1.392 1.392 0 .769-.624 1.393-1.392 1.393zm1.905-.985c-.218-1.152-.942-2.198-2.038-3.036.216-.153.475-.243.763-.243.757 0 1.375.615 1.375 1.371 0 .269-.041.531-.1.786z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="Kickstarter">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.518 10.364l-4.735-4.482c-.378-.388-.868-.614-1.443-.614-1.04 0-1.921.841-1.921 1.944v10.301c0 1.051.815 1.884 1.902 1.884.585 0 1.077-.245 1.48-.687l5.109-5.719c.406-.471.558-1.037.558-1.637 0-.585-.207-1.112-.56-1.503L16.518 10.364zM6.48 4.298c0-1.04.832-1.885 1.866-1.885.558 0 1.066.218 1.453.624.378.397.595.915.595 1.472v14.73c0 .546-.217 1.045-.585 1.433-.396.406-.885.623-1.443.623-1.03 0-1.886-.84-1.886-1.894V4.298h.001z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
          </div>
        </div>
      </div>
      
      <!-- Designer Console for Kylo -->
      <div class="designer-console" id="kylo-console">
        <div class="console-header">KYLO LAYOUT CONSOLE</div>
        
        <div class="slider-group">
          <label for="kylo-scale">Scale: <span id="kylo-scale-val">1.0</span></label>
          <input type="range" id="kylo-scale" min="0.5" max="1.5" step="0.01" value="1.0">
        </div>

        <div class="slider-group">
          <label for="kylo-x">X Position: <span id="kylo-x-val">0px</span></label>
          <input type="range" id="kylo-x" min="-800" max="800" step="1" value="0">
        </div>

        <div class="slider-group">
          <label for="kylo-y">Y Position: <span id="kylo-y-val">0px</span></label>
          <input type="range" id="kylo-y" min="-800" max="800" step="1" value="0">
        </div>
        
        <div class="console-footer">
          transform: scale(<span id="kylo-scale-out">1.0</span>)<br>
          translate(<span id="kylo-x-out">0px</span>, <span id="kylo-y-out">0px</span>);
        </div>
      </div>
    </section>

  </div>"""
    
    html = html.replace("    </section>\n\n  </div>", kylo_html)
    
    with open("index.html", "w") as f:
        f.write(html)

def update_css():
    with open("style.css", "r") as f:
        css = f.read()
        
    if "section-kylo" in css: return
    
    kylo_css = """
/* SCREEN 11: KYLO STYLING */
#section-kylo {
  transform: translate(100vw, 500vh);
}

.kylo-content {
  position: relative;
  z-index: 4;
  text-align: center;
  max-width: 600px;
  width: 90%;
}

.kylo-heading {
  font-size: 2.8rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin-bottom: 1.2rem;
  color: #ffffff;
}

.kylo-subtext {
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 480px;
  margin: 0 auto;
}
"""
    css += kylo_css
    with open("style.css", "w") as f:
        f.write(css)

def update_js():
    with open("script.js", "r") as f:
        js = f.read()

    if "bgVideoKylo" in js: return
        
    js = js.replace("const bgVideoWtfcharts = document.getElementById('bg-video-wtfcharts');", "const bgVideoWtfcharts = document.getElementById('bg-video-wtfcharts');\n  const bgVideoKylo = document.getElementById('bg-video-kylo');")
    
    js = js.replace("const wtfchartsSection = document.getElementById('section-wtfcharts');", "const wtfchartsSection = document.getElementById('section-wtfcharts');\n  const kyloSection = document.getElementById('section-kylo');")
    
    js = js.replace("const wtfchartsSocials = document.getElementById('wtfcharts-socials');", "const wtfchartsSocials = document.getElementById('wtfcharts-socials');\n  const kyloPositioner = document.getElementById('kylo-positioner');\n  const kyloCardDOM = document.getElementById('kylo-card');\n  const kyloHeading = document.getElementById('kylo-heading');\n  const kyloSubtext = document.getElementById('kylo-subtext');\n  const kyloSocials = document.getElementById('kylo-socials');")
    
    js = js.replace("let wtfchartsAnimated = false;", "let wtfchartsAnimated = false;\n  let kyloAnimated = false;")
    
    js = js.replace("if (bgVideoWtfcharts) bgVideoWtfcharts.muted = true;", "if (bgVideoWtfcharts) bgVideoWtfcharts.muted = true;\n    if (bgVideoKylo) bgVideoKylo.muted = true;")
    
    js = js.replace("    } else if (slideNum === 10) {\n      targetX = innerW * 2;\n      targetY = innerH * 5;\n    }", "    } else if (slideNum === 10) {\n      targetX = innerW * 2;\n      targetY = innerH * 5;\n    } else if (slideNum === 11) {\n      targetX = innerW;\n      targetY = innerH * 5;\n    }")

    js = js.replace("if (bgVideoWtfcharts && !bgVideoWtfcharts.paused && slideNum !== 10) bgVideoWtfcharts.pause();", "if (bgVideoWtfcharts && !bgVideoWtfcharts.paused && slideNum !== 10) bgVideoWtfcharts.pause();\n    if (bgVideoKylo && !bgVideoKylo.paused && slideNum !== 11) bgVideoKylo.pause();")

    js = js.replace("if (slideNum === 10 && bgVideoWtfcharts && bgVideoWtfcharts.paused) bgVideoWtfcharts.play().catch(() => {});", "if (slideNum === 10 && bgVideoWtfcharts && bgVideoWtfcharts.paused) bgVideoWtfcharts.play().catch(() => {});\n    if (slideNum === 11 && bgVideoKylo && bgVideoKylo.paused) bgVideoKylo.play().catch(() => {});")
    
    js = js.replace("else if (currentSlide === 9) goToSlide(10);", "else if (currentSlide === 9) goToSlide(10);\n      else if (currentSlide === 10) goToSlide(11);")
    
    js = js.replace("if (currentSlide === 10) goToSlide(9);", "if (currentSlide === 11) goToSlide(10);\n      else if (currentSlide === 10) goToSlide(9);")

    # In IntersectionObserver
    js = js.replace("if (bgVideoIndratir && !bgVideoIndratir.paused) bgVideoIndratir.pause();", "if (bgVideoIndratir && !bgVideoIndratir.paused) bgVideoIndratir.pause();\n          if (bgVideoKylo && !bgVideoKylo.paused) bgVideoKylo.pause();")
    
    obs_kylo = """          if (bgVideoWtfcharts && !bgVideoWtfcharts.paused) bgVideoWtfcharts.pause();

          if (!kyloAnimated) {
            gsap.killTweensOf([kyloPositioner, kyloHeading, kyloSubtext, kyloSocials]);
            
            gsap.to(kyloPositioner, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" });
            gsap.to(kyloHeading, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.15 });
            gsap.to(kyloSubtext, { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.3 });
            gsap.to(kyloSocials, { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.45 });
            kyloAnimated = true;
          }
        } else if (entry.target.id === 'section-kylo') {
          currentSlide = 11;
          if (bgVideoKylo && bgVideoKylo.paused) bgVideoKylo.play().catch(() => {});
          if (bgVideoHero && !bgVideoHero.paused) bgVideoHero.pause();
          if (bgVideoAbout && !bgVideoAbout.paused) bgVideoAbout.pause();
          if (bgVideoProducts && !bgVideoProducts.paused) bgVideoProducts.pause();
          if (bgVideoStonks && !bgVideoStonks.paused) bgVideoStonks.pause();
          if (bgVideoSandhya && !bgVideoSandhya.paused) bgVideoSandhya.pause();
          if (bgVideoJimbro && !bgVideoJimbro.paused) bgVideoJimbro.pause();
          if (bgVideoAgni && !bgVideoAgni.paused) bgVideoAgni.pause();
          if (bgVideoDoctrine && !bgVideoDoctrine.paused) bgVideoDoctrine.pause();
          if (bgVideoIndratir && !bgVideoIndratir.paused) bgVideoIndratir.pause();
          if (bgVideoWtfcharts && !bgVideoWtfcharts.paused) bgVideoWtfcharts.pause();"""

    js = js.replace("if (bgVideoWtfcharts && !bgVideoWtfcharts.paused) bgVideoWtfcharts.pause();", obs_kylo)
    
    obs_kylo2 = """          gsap.set(wtfchartsSocials, { opacity: 0, y: 20 });
          wtfchartsAnimated = false;
        } else if (entry.target.id === 'section-kylo') {
          gsap.killTweensOf([kyloPositioner, kyloHeading, kyloSubtext, kyloSocials]);
          gsap.set(kyloPositioner, { opacity: 0, y: 30 });
          gsap.set(kyloHeading, { opacity: 0, y: 20 });
          gsap.set(kyloSubtext, { opacity: 0, y: 20 });
          gsap.set(kyloSocials, { opacity: 0, y: 20 });
          kyloAnimated = false;"""
          
    js = js.replace("gsap.set(wtfchartsSocials, { opacity: 0, y: 20 });\n          wtfchartsAnimated = false;", obs_kylo2)
    
    js = js.replace("if (wtfchartsSection) observer.observe(wtfchartsSection);", "if (wtfchartsSection) observer.observe(wtfchartsSection);\n  if (kyloSection) observer.observe(kyloSection);")
    
    js = js.replace("if (bgVideoWtfcharts) bgVideoWtfcharts.pause();", "if (bgVideoWtfcharts) bgVideoWtfcharts.pause();\n      if (bgVideoKylo) bgVideoKylo.pause();")
    
    js = js.replace("      } else if (currentSlide === 10) {\n        if (bgVideoWtfcharts && bgVideoWtfcharts.paused) bgVideoWtfcharts.play().catch(() => {});\n      }", "      } else if (currentSlide === 10) {\n        if (bgVideoWtfcharts && bgVideoWtfcharts.paused) bgVideoWtfcharts.play().catch(() => {});\n      } else if (currentSlide === 11) {\n        if (bgVideoKylo && bgVideoKylo.paused) bgVideoKylo.play().catch(() => {});\n      }")

    # Layout console for Kylo
    console_js = """  const kyloScale = document.getElementById('kylo-scale');
  const kyloX = document.getElementById('kylo-x');
  const kyloY = document.getElementById('kylo-y');
  const kyloCard = document.getElementById('kylo-card');

  if (kyloScale && kyloX && kyloY && kyloCard) {
    function updateKyloLayout() {
      const s = kyloScale.value;
      const x = kyloX.value;
      const y = kyloY.value;
      
      document.getElementById('kylo-scale-val').innerText = s;
      document.getElementById('kylo-x-val').innerText = `${x}px`;
      document.getElementById('kylo-y-val').innerText = `${y}px`;
      document.getElementById('kylo-scale-out').innerText = s;
      document.getElementById('kylo-x-out').innerText = `${x}px`;
      document.getElementById('kylo-y-out').innerText = `${y}px`;
      
      kyloCard.style.transform = `scale(${s}) translate(${x}px, ${y}px)`;
    }
    
    kyloScale.addEventListener('input', updateKyloLayout);
    kyloX.addEventListener('input', updateKyloLayout);
    kyloY.addEventListener('input', updateKyloLayout);
  }"""
  
    js += "\n" + console_js

    with open("script.js", "w") as f:
        f.write(js)

if __name__ == "__main__":
    update_html()
    update_css()
    update_js()
