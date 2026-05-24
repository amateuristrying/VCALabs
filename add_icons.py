import re

def update_html():
    with open("index.html", "r") as f:
        html = f.read()

    social_wrapper = """          <!-- Social Links -->
          <div class="social-links-wrapper" id="{prefix}-socials">
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
          </div>"""

    # We will replace `<!-- Minimalist GitHub Link -->` up to `</a>` with social_wrapper.
    # But wtfcharts doesn't have it yet! Let's just find `</p>` in each product card and append if not there.

    products = [
        ("stonks-card", "stonks"),
        ("sandhya-card", "sandhya"),
        ("jbro-card", "jbro"),
        ("agni-card", "agni"),
        ("doctrine-card", "doctrine"),
        ("indratir-card", "indratir"),
        ("wtfcharts-card", "wtfcharts")
    ]
    
    # First, let's remove existing github links
    html = re.sub(r'<!-- Minimalist GitHub Link -->.*?</a>', '', html, flags=re.DOTALL)
    
    for card_id, prefix in products:
        pattern = fr'(<div class="glass-card"[^>]*id="{card_id}">.*?</p>)'
        html = re.sub(pattern, r'\1\n' + social_wrapper.format(prefix=prefix), html, flags=re.DOTALL)
        
    with open("index.html", "w") as f:
        f.write(html)

def update_css():
    with open("style.css", "r") as f:
        css = f.read()
        
    social_css = """
/* Social Links Row */
.social-links-wrapper {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 1.8rem;
  opacity: 0;
  transform: translateY(20px);
}

.social-link {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: var(--transition-fast);
  pointer-events: auto;
}

.social-link svg {
  width: 18px;
  height: 18px;
  fill: var(--text-secondary);
  transition: var(--transition-fast);
}

/* Specific fix for link icon which uses stroke */
.social-link svg[stroke="currentColor"] {
  fill: none;
  stroke: var(--text-secondary);
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(6, 182, 212, 0.3);
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.15);
  transform: translateY(-3px);
}

.social-link:hover svg {
  fill: #ffffff;
  transform: scale(1.05);
}

.social-link:hover svg[stroke="currentColor"] {
  stroke: #ffffff;
}
"""
    # Replace github-link CSS with social-link CSS
    css = re.sub(r'/\* Minimalist Outline GitHub Link \*/.*?(?=/\* Animations \*/)', social_css, css, flags=re.DOTALL)
    
    with open("style.css", "w") as f:
        f.write(css)
        
def update_js():
    with open("script.js", "r") as f:
        js = f.read()
        
    # Replace github-link ids with socials ids
    # e.g., const githubLink = document.getElementById('github-link');
    js = js.replace("const githubLink = document.getElementById('github-link');", "const stonksSocials = document.getElementById('stonks-socials');")
    js = js.replace("const sandhyaGithubLink = document.getElementById('sandhya-github-link');", "const sandhyaSocials = document.getElementById('sandhya-socials');")
    js = js.replace("const jbroGithubLink = document.getElementById('github-link-jbro');", "const jbroSocials = document.getElementById('jbro-socials');")
    js = js.replace("const agniGithubLink = document.getElementById('agni-github-link');", "const agniSocials = document.getElementById('agni-socials');")
    js = js.replace("const doctrineGithubLink = document.getElementById('doctrine-github-link');", "const doctrineSocials = document.getElementById('doctrine-socials');")
    js = js.replace("const indratirGithubLink = document.getElementById('indratir-github-link');", "const indratirSocials = document.getElementById('indratir-socials');")
    
    js = js.replace("githubLink", "stonksSocials")
    js = js.replace("sandhyaGithubLink", "sandhyaSocials")
    js = js.replace("jbroGithubLink", "jbroSocials")
    js = js.replace("agniGithubLink", "agniSocials")
    js = js.replace("doctrineGithubLink", "doctrineSocials")
    js = js.replace("indratirGithubLink", "indratirSocials")
    
    # Also add wtfchartsSocials
    js = re.sub(r'(const wtfchartsSubtext = document.getElementById\(\'wtfcharts-subtext\'\);)', r'\1\n  const wtfchartsSocials = document.getElementById(\'wtfcharts-socials\');', js)
    js = re.sub(r'(gsap\.killTweensOf\(\[wtfchartsPositioner, wtfchartsHeading, wtfchartsSubtext)', r'gsap.killTweensOf([wtfchartsPositioner, wtfchartsHeading, wtfchartsSubtext, wtfchartsSocials', js)
    js = re.sub(r'(gsap\.fromTo\(wtfchartsSubtext,.*?delay: 0\.45 \n      \);)', r'\1\n      gsap.fromTo(wtfchartsSocials,\n        { opacity: 0, y: 20 },\n        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out", delay: 0.6 }\n      );', js, flags=re.DOTALL)
    
    with open("script.js", "w") as f:
        f.write(js)

update_html()
update_css()
update_js()

