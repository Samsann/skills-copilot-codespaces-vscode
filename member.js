function skillsMember() {
    let skills = ["Javascript", "React", "Node", "Express", "MongoDB"];
    
    return {
        skills: skills,
        addSkill: function(newSkill) {
            if (typeof newSkill === 'string' && !skills.includes(newSkill)) {
                skills.push(newSkill);
            }
        }
    };
}