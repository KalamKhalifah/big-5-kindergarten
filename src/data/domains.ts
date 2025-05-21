import type { AllDomainsInfo } from '../types';

export const domainDetails: AllDomainsInfo = {
  N: {
    name: 'Tense', // Changed from Neuroticism (Feeling Upset or Worried Easily)
    description:
      'Some children feel sad, worried, or upset more easily than others. They may cry when things go wrong, worry about being left out, or get upset if their routine changes. These feelings are okay — they just mean the child feels things deeply.\nOther children stay calm and bounce back quickly when something doesn’t go their way. They might still feel upset sometimes, but they handle it quietly and move on more easily.',
    observationGuide: {
      low: 'The child stays calm in stressful or frustrating situations.\nRarely cries or panics, even when things go wrong.\nCan handle changes and small problems with ease.',
      neutral:
        'The child sometimes gets upset but usually calms down quickly.\nMay need a bit of support but can cope with frustration or worry.\nShows a balanced range of feelings.',
      high: 'The child gets upset, worried, or angry easily.\nMight cry, withdraw, or become overwhelmed in stressful moments.\nNeeds more comfort and support to feel okay again.',
    },
    facets: {
      1: { name: 'Worrying (Anxiety)', description: 'Does the child often seem nervous or afraid of something bad happening?' },
      2: { name: 'Getting Mad (Anger)', description: 'Does the child get angry or frustrated quickly when things don’t go their way?' },
      3: { name: 'Feeling Sad (Depression)', description: 'Does the child seem down, tired, or not excited about things?' },
      4: { name: 'Feeling Shy (Self-Consciousness)', description: 'Is the child very shy or afraid others are watching or laughing at them?' },
      5: { name: 'Having Strong Cravings (Immoderation)', description: 'Does the child have trouble waiting or stopping when they really want something?' },
      6: { name: 'Struggling with Stress (Vulnerability)', description: 'Does the child become panicked or confused when stressed, needing extra help?' },
    },
  },
  E: {
    name: 'Active', // Changed from Extraversion (Being Outgoing and Full of Energy)
    description:
      'Some children love to talk, play with others, and are full of energy. They like to be around people, join in games quickly, and enjoy excitement. These kids are often bubbly, playful, and eager to be part of the group.\nOther children prefer quieter time. They might play alone, speak softly, or enjoy peaceful activities like drawing or reading. These children may not always join group games right away, but they are still kind and friendly when approached.',
    observationGuide: {
      low: 'The child is quiet and enjoys being alone or in small groups.\nOften prefers calm activities and needs space to recharge.\nMay need gentle encouragement to join group play.',
      neutral:
        'The child is sometimes outgoing, sometimes quiet.\nCan enjoy both playing with others and spending time alone.\nComfortable in many types of activities but not overly energetic.',
      high: 'The child is very social and full of energy.\nLoves to talk, play with others, and try new things.\nEnjoys busy, fun activities and is often the first to join in.',
    },
    facets: {
      1: { name: 'Friendliness', description: 'Does the child smile, share, and make friends easily?' },
      2: { name: 'Sociability', description: 'Does the child like being in groups and around others?' },
      3: { name: 'Assertiveness', description: 'Does the child speak up, lead, or take charge in group play?' },
      4: { name: 'Energy Level', description: 'Is the child always on the move and involved in many activities?' },
      5: { name: 'Excitement-Seeking', description: 'Does the child love action, noise, and new experiences?' },
      6: { name: 'Cheerfulness', description: 'Does the child seem generally happy, enthusiastic, and optimistic?' },
    },
  },
  O: {
    name: 'Creative', // Changed from Openness to Experience (Liking New and Creative Things)
    description:
      'Some children love exploring new ideas, using their imagination, and trying different things. They may enjoy pretending, looking at art, or asking big questions about the world.\nOther children prefer routines and familiar things. They might like doing the same activities every day and find comfort in rules and clear directions.',
    observationGuide: {
      low: 'The child likes things to be simple, clear, and familiar.\nPrefers daily routines and doesn\'t often pretend or imagine.\nTends to follow rules and stick to what they know.',
      neutral:
        'The child sometimes enjoys new ideas or creative play, but also likes structure.\nWill try new things with some encouragement.\nShows a balanced mix of curiosity and comfort with routine.',
      high: 'The child loves to pretend, explore, and ask questions.\nEnjoys art, stories, music, and imaginative games.\nLikes trying new things and thinking in unique ways.',
    },
    facets: {
      1: { name: 'Imagination', description: 'Does the child like make-believe, pretending, or inventing stories?' },
      2: { name: 'Artistic Interests', description: 'Does the child enjoy drawing, singing, dancing, or looking at nature?' },
      3: { name: 'Emotional Awareness', description: 'Is the child aware of their feelings and able to talk about them?' },
      4: { name: 'Trying New Things (Adventurousness)', description: 'Does the child like new activities, foods, or games?' },
      5: { name: 'Thinking About Ideas (Intellect)', description: 'Does the child ask “why” or enjoy puzzles and problem-solving?' },
      6: { name: 'Challenging Rules (Liberalism)', description: 'Does the child often question rules or want to do things in their own way?' },
    },
  },
  A: {
    name: 'Friendly', // Changed from Agreeableness (Being Kind and Getting Along with Others)
    description:
      'Some children are naturally kind, friendly, and like to play nicely with others. They try to help friends, share toys, and are happy when everyone gets along. These children are usually very caring and believe that most people are good.\nOther children may prefer to do things their own way. They might not always want to share or help. They can be more serious or cautious when playing with others and may need extra time to trust or feel comfortable in groups.',
    observationGuide: {
      low: 'The child prefers to do things their own way.\nMay seem tough, less likely to share or help.\nMight be critical of others\' ideas or not easily compromise.\nMay need guidance on taking turns and teamwork.',
      neutral:
        'The child sometimes helps and shares, but other times prefers their own needs.\nCan work with others but may not always go out of their way to do so.\nShows kindness in some situations, but not consistently.',
      high: 'The child is very kind and caring.\nLikes to help others, share, and solve problems peacefully.\nOften friendly, gentle, and enjoys group play.',
    },
    facets: {
      1: { name: 'Trust', description: 'Does the child believe others will be nice? Are they quick to make friends?' },
      2: { name: 'Honesty', description: 'Does the child speak the truth and act in a fair way?' },
      3: { name: 'Helping Others', description: 'Does the child enjoy helping friends or the teacher?' },
      4: { name: 'Working Together', description: 'Is the child okay with taking turns and solving problems without arguing?' },
      5: { name: 'Being Humble', description: 'Does the child avoid bragging or saying they are better than others?' },
      6: { name: 'Caring', description: 'Does the child show concern when others are sad or hurt?' },
    },
  },
  C: {
    name: 'Responsible', // Changed from Conscientiousness (Being Careful, Focused, and Responsible)
    description:
      'Some children like to follow rules, stay organized, and finish what they start. They think before they act and try their best to do things the right way. These children are usually responsible, reliable, and show strong focus.\nOther children may act quickly without thinking. They like to enjoy the moment and may have a harder time sitting still, finishing tasks, or remembering rules. They might be more playful or creative but sometimes forget what they’re supposed to do.',
    observationGuide: {
      low: 'The child often jumps into activities without thinking.\nMight forget instructions or leave tasks unfinished.\nHas a hard time organizing or following routines.\nLikes to have fun but may need reminders to stay focused.',
      neutral:
        'The child shows some responsibility and planning.\nCan stay on task with a bit of support.\nSometimes thinks things through, but not always.',
      high: 'The child likes to finish what they start.\nFollows routines, remembers instructions, and stays organized.\nTries very hard to do things well and does not give up easily.',
    },
    facets: {
      1: { name: 'Confidence', description: 'Does the child believe they can do things well? Do they try even when it’s hard?' },
      2: { name: 'Organization', description: 'Does the child keep things tidy and follow routines?' },
      3: { name: 'Following Rules', description: 'Does the child take responsibility and do what they are told?' },
      4: { name: 'Working Hard', description: 'Does the child try their best and want to do a good job?' },
      5: { name: 'Self-Control', description: 'Can the child stay on task even when it\'s boring or hard?' },
      6: { name: 'Thinking Before Acting', description: 'Does the child stop and think before making a decision?' },
    },
  },
};
