import Link from 'next/link'
import Image from 'next/image'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaBehance, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { MdMailOutline, MdPhone } from 'react-icons/md'
import ScrollReveal from '../Animations/ScrollReveal'
import ContactHeading from './ContactHeading'

const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/ui.saumya/',
    label: 'Instagram',
    Icon: FaInstagram,
  },
  {
    href: 'https://www.linkedin.com/in/saumya-gautam-a9731b214/',
    label: 'LinkedIn',
    Icon: FaLinkedinIn,
  },
  {
    href: 'https://www.behance.net/saumyagautam2',
    label: 'Behance',
    Icon: FaBehance,
  },
] as const

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="w-full max-w-full overflow-x-clip rounded-t-[50px] bg-[#8A6C59] bg-[linear-gradient(to_right,rgba(253,248,231,0.2)_1px,transparent_1px)] bg-[size:12rem] bg-center text-white md:bg-[size:200px]"
    >
      <div className="mx-auto max-w-[1512px]">
        <div className="overflow-hidden px-6 pt-12 md:px-0 md:pt-20">
          <ScrollReveal>
            <ContactHeading />
          </ScrollReveal>
        </div>

        <div className="flex flex-col items-center gap-10 px-6 pb-16 pt-10 text-center md:flex-row md:items-start md:justify-between md:gap-8 md:px-16 md:pb-20 md:pt-[72px] md:text-left lg:px-[80px] xl:px-[147px]">
          <div className="relative mx-auto w-full max-w-[340px] font-annie text-[16px] leading-[1.43] tracking-[0.04em] md:mx-0 md:max-w-[371px] md:text-[30px] md:leading-[43px]">
            <ScrollReveal>
              <Image
                src="/images/decoresImg/light_three_lines.png"
                alt=""
                width={47}
                height={67}
                className="absolute left-[-12px] top-[-16px] h-[30px] w-[20px] md:left-[-45px] md:top-[-40px] md:h-[67px] md:w-[47px]"
                draggable={false}
              />
              <p>
                I am currently available for new work, let me know if you need a
                UX/UI Designer. I&apos;d love to talk about the next big thing!
              </p>
            </ScrollReveal>
          </div>

          <div className="flex w-full flex-col items-center gap-6 md:w-auto md:items-start md:gap-[30px]">
            <ScrollReveal>
              <a
                href="mailto:gautam.saumya11@gmail.com"
                className="flex items-center justify-center gap-2.5 font-montserrat text-[16px] font-medium leading-none md:justify-start md:text-2xl"
              >
                <MdMailOutline className="shrink-0" size={24} />
                <span>gautam.saumya11@gmail.com</span>
              </a>
            </ScrollReveal>
            <ScrollReveal>
              <a
                href="tel:+919955993332"
                className="flex items-center justify-center gap-2.5 font-montserrat text-[16px] font-normal leading-none md:justify-start md:text-2xl"
              >
                <MdPhone className="shrink-0" size={24} />
                <span>+91 9955993332</span>
              </a>
            </ScrollReveal>
          </div>

          <ScrollReveal containerClassName="w-full md:w-auto" itemSelector="li" stagger={0.1}>
          <ul className="flex w-full flex-row items-center justify-between gap-2 md:w-auto md:flex-col md:items-start md:justify-start md:gap-5">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <li key={label}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5"
                  >
                    <Icon className="hidden shrink-0 md:block md:text-[44px]" />
                    <span className="inline-flex items-center gap-1 font-montserrat text-[14px] font-medium underline md:gap-2.5 md:text-[30px] md:leading-[37px]">
                      {label}
                      <FiArrowUpRight className="shrink-0 text-base md:text-[32px]" />
                    </span>
                  </Link>
              </li>
            ))}
          </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
