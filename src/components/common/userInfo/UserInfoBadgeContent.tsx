import { IconAngry } from "../../../config/IconData";

interface Emotions {
    anger: string;
    happiness: string;
    indifference: string;
    sadness: string;
    worry: string;
}

interface TreeEmotion {
    emotions: Emotions;
    tree_uuid?: string;
}

interface UserData {
    treeEmotion: TreeEmotion[];
}

interface UserInfoBadgeProps {
    type: "angry" | "happy" | "sorrow" | "worry" | "indiff";
    userData: UserData;
    threshold: number;
}

const Badge = ({ emotion }: { emotion: keyof Emotions }) => {
    const emotionImages: { [key in keyof Emotions]: string } = {
        anger: "badge_anger_01.png",
        happiness: "badge_happiness_01.png",
        indifference: "badge_indifference_01.png",
        sadness: "badge_sadness_01.png",
        worry: "badge_worry_01.png",
    };

    return <img src={emotionImages[emotion]} alt={emotion} />;
};

const calculateEmotion = (userData: UserData, type: keyof Emotions): number => {
    const reduceData = userData.treeEmotion.reduce((acc: number, curr: TreeEmotion) => {
        if (curr.emotions && curr.emotions[type] !== undefined) {
            return acc + Number(curr.emotions[type]);
        } else {
            throw new Error(`Type '${type}' is not valid or does not exist in the emotions object`);
        }
    }, 0);

    return reduceData;
};

const UserInfoBadgeContent = ({ userData, type, threshold }: UserInfoBadgeProps) => {
    const emotionTypes: (keyof Emotions)[] = [
        "anger",
        "happiness",
        "indifference",
        "sadness",
        "worry",
    ];

    return (
        <div className="flex flex-col gap-5">
            {emotionTypes.map((emotion) => {
                const score = calculateEmotion(userData, emotion);
                if (score >= 4) {
                    return (
                        <div className="w-12 h-12 rounded-full border border-white" key={emotion}>
                            <Badge emotion={emotion} />
                        </div>
                    );
                } else if (score > 100) {
                    return (
                        <div className="w-12 h-12 rounded-full border border-white" key={emotion}>
                            <Badge emotion={emotion} />
                        </div>
                    );
                } else if (score > 250) {
                    return (
                        <div className="w-12 h-12 rounded-full border border-white" key={emotion}>
                            <Badge emotion={emotion} />
                        </div>
                    );
                }
                return null;
            })}
            <div className="mt-1 text-sm text-gray-200 text-center">{type}</div>
        </div>
    );
};

export default UserInfoBadgeContent;
