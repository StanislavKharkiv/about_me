import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About me",
}

export default function About() {
  return (
    <section>
      <h2>About me</h2>
      <article>
        <p>
          I’m a developer with a strong interest in creating clear, efficient and reliable digital solutions. My journey
          started with a simple curiosity: the idea that you can instruct a computer to perform complex tasks and turn
          ideas into real, functional products. Once I built my first small application, I realized how powerful and
          meaningful this work can be — and I’ve been developing ever since.
        </p>
        <p>
          I specialize in JavaScript, React, TypeScript and Node.js, and I’m confident working across both frontend and
          backend. I can set up complete environments with Docker, servers and databases, and I have practical
          experience with Python and PHP as well. I use industry-standard tools such as Git, Jira, Figma and various CLI
          utilities to keep my workflow clean and efficient.
        </p>
        <p>
          I’m a collaborative teammate who enjoys learning new technologies and approaching challenges with a
          problem-solving mindset. I focus on writing maintainable code, understanding the needs behind each feature,
          and delivering results that are both technically solid and user-friendly.
        </p>
        <p>
          Currently, I’m expanding my expertise in modern frontend ecosystems (including Angular), exploring
          cybersecurity, learning Java, and integrating AI tools into my development process.
        </p>
      </article>
    </section>
  )
}
