import React from "react";

function Footer() {
  
  return (
    <footer class="bg-gradient-to-r from-[#00293b] via-[#00296b] to-[#00293b] py-12 sm:px-16 max-sm:px-8 font-sans tracking-wide">

      <hr class="my-1 border-gray-400" />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div class="lg:col-span-2">
          <h4 class="text-lg mb-6 text-white">About Us</h4>
          <p class="text-gray-300 mb-2 text-[15px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            gravida, mi eu pulvinar cursus, sem elit interdum mauris.
          </p>
        </div>

        <div>
          <h4 class="text-lg mb-6 text-white">Services</h4>
          <ul class="space-y-5">
            <li>
              <a
                href="javascript:void(0)"
                class="text-gray-300 hover:text-white text-[15px]"
              >
                Digital Marketing
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg mb-6 text-white">Resources</h4>
          <ul class="space-y-5">
            
            <li>
              <a
                href="javascript:void(0)"
                class="text-gray-300 hover:text-white text-[15px]"
              >
                Tutorials
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg mb-6 text-white">About Us</h4>
          <ul class="space-y-5">
            <li>
              <a
                href="javascript:void(0)"
                class="text-gray-300 hover:text-white text-[15px]"
              >
                Team
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                class="text-gray-300 hover:text-white text-[15px]"
              >
                Testimonials
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p class="text-gray-300 text-[15px] mt-10 text-center">
        <a href="3" target="_blank" class="hover:underline mx-1 text-center">
          WaveSync © <script>document.write(new Date().getFullYear())</script>
        </a>
        All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;
