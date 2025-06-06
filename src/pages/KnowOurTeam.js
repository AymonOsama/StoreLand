import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Ahmed Ali",
    role: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    group: "Technical Team",
    from: "2022",
    to: "Present",
  },
  {
    name: "Sara Mostafa",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    group: "Design Team",
    from: "2021",
    to: "Present",
  },
  {
    name: "Mohamed Tarek",
    role: "Backend Developer",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    group: "Technical Team",
    from: "2020",
    to: "Present",
  },
  {
    name: "Layla Hassan",
    role: "Project Manager",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    group: "Executive Management",
    from: "2019",
    to: "Present",
  },
  {
    name: "Omar Youssef",
    role: "Mobile Developer",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    group: "Technical Team",
    from: "2023",
    to: "Present",
  },
  {
    name: "Nour El-Din",
    role: "QA Engineer",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    group: "Technical Team",
    from: "2022",
    to: "Present",
  },
  {
    name: "Dina Khaled",
    role: "Art Director",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    group: "Design Team",
    from: "2020",
    to: "Present",
  },
  {
    name: "Hassan Fathy",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    group: "Executive Management",
    from: "2018",
    to: "Present",
  },
];

export default function KnowOurTeam() {
  const groupedMembers = teamMembers.reduce((groups, member) => {
    if (!groups[member.group]) {
      groups[member.group] = [];
    }
    groups[member.group].push(member);
    return groups;
  }, {});

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900">👥 Know Our Team</h2>
          <p className="text-gray-600 text-lg mt-2">
            Meet the dream team building tomorrow’s success.
          </p>
        </motion.div>

        {Object.keys(groupedMembers).map((group, groupIndex) => (
          <div key={group} className="mb-16">
            <motion.h3
              className="text-2xl font-semibold text-blue-700 mb-6 border-b pb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: groupIndex * 0.2 }}
            >
              {group}
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {groupedMembers[group].map((member, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow"
                  />
                  <h4 className="text-lg font-bold text-gray-800">{member.name}</h4>
                  <p className="text-blue-600 text-sm">{member.role}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {member.from} - {member.to}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
