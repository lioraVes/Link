"use client";

import React from "react";

interface TopNavProps {
  theme: string;
}

const TopNav: React.FC<TopNavProps> = ({ theme }) => {
  const back = "< חזרה";
  const bgColor = theme === "white" ? "white" : "#FE5068";
  const elementsColor = theme === "white" ? "#4E538A" : "white";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: bgColor,
        position: "fixed",
        top: "0",
        zIndex: 1000,
        marginTop: "20px",
        marginBottom: "10px",
      }}
    >
      {/* Back Button */}
      <div
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: elementsColor,
          cursor: "pointer",
          marginRight: "20px",
        }}
      >
        {back}
      </div>

      {/* Center Icon */}
      {/* <div style={{ marginLeft: "20px" }}>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.8497 43.9999C27.9104 43.9569 33.0901 41.9296 37.3924 37.7872C41.0975 34.2198 43.3318 29.8011 43.8656 24.6339C44.8941 14.697 39.9832 6.09304 30.9305 1.86292C23.2217 -1.7381 13.0919 0.0204035 6.9846 5.9437C3.12272 9.68846 0.763416 14.1445 0.153056 19.5077C0.128791 19.7205 0.0522632 19.9277 0 20.1368V23.8554C0.526365 25.9817 0.838078 28.192 1.61829 30.2193C4.85301 38.6217 13.3066 44.0615 21.8497 43.9999ZM24.4928 34.8172C22.9155 34.7686 21.3364 34.791 19.7573 34.8078C19.0985 34.8153 18.7961 34.5521 18.7961 33.8763C18.8054 28.7371 18.8054 23.5978 18.7961 18.4605C18.7961 17.7847 19.1115 17.5215 19.7629 17.5271C21.3719 17.5401 22.9827 17.5513 24.5917 17.5215C25.4111 17.5065 25.6687 17.8892 25.6631 18.6546C25.6575 19.2818 25.6538 19.9091 25.6519 20.5344C25.6463 22.4143 25.6538 24.296 25.6556 26.1759C25.6556 28.6531 25.6332 31.1303 25.6687 33.6056C25.6799 34.4681 25.3962 34.8452 24.4909 34.8172H24.4928ZM29.2077 22.4274C29.2077 18.7423 29.2039 15.0573 29.2077 11.3723C29.2077 10.1925 29.3066 10.0991 30.4769 10.0917C31.9627 10.0842 33.4503 10.1159 34.9361 10.0805C35.7853 10.0599 36.0784 10.4184 36.0765 11.2454C36.0597 18.7405 36.0597 26.2337 36.0765 33.7288C36.0765 34.526 35.7648 34.8414 34.9715 34.8246C33.4242 34.7929 31.8749 34.7854 30.3276 34.8284C29.469 34.8508 29.1927 34.4942 29.1983 33.6691C29.2039 32.732 29.2095 31.7949 29.2114 30.8596C29.2189 28.0501 29.2114 25.2387 29.2114 22.4274H29.2077ZM19.9813 9.23483C21.1461 8.65613 22.3761 8.63746 23.5912 9.03322C25.0135 9.49618 25.8012 10.5994 25.8124 12.0107C25.8236 13.3996 25.1013 14.4338 23.6902 14.9472C23.1451 15.1451 22.5572 15.2216 22.1801 15.3075C20.8325 15.1992 19.7499 14.9341 18.9715 14.0325C17.637 12.4868 18.1353 10.1496 19.9795 9.23296L19.9813 9.23483ZM7.99627 31.8378C8.06533 30.5609 8.73728 29.5286 9.9692 29.2206C10.8371 29.004 11.8115 28.9163 12.685 29.0731C14.4041 29.3811 15.3579 30.7663 15.2086 32.4165C15.0686 33.9697 13.846 35.0711 12.1251 35.1849C11.9403 35.198 11.7555 35.1849 11.5707 35.1849C9.21139 35.2036 7.88054 33.9529 7.99627 31.8359V31.8378Z"
            fill={elementsColor}
          />
        </svg>
      </div> */}
    </div>
  );
};

export default TopNav;
