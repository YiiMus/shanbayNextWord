// 配置
const CONFIG = {
    NEXT_KEY: "ArrowDown"
};

function isElementVisible(element) {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0' &&
        element.offsetWidth > 0 &&
        element.offsetHeight > 0;
}

function findNextButton() {
    try {
        const answerButtons = document.querySelectorAll('[class*="tenseAnswer"], [class*="answer"], span:not([class*="menu"]):not([class*="header"])');
        for (const button of answerButtons) {
            const text = button.textContent.trim();
            if (isElementVisible(button) && (text === '查看正确答案' || text.includes('查看答案'))) {
                return button;
            }
        }

        const allButtons = document.querySelectorAll('span[class*="continueBtn"]');
        for (const button of allButtons) {
            if (isElementVisible(button) && button.textContent.includes('继续')) {
                return button;
            }
        }


        const allSpans = document.querySelectorAll('span');
        for (const span of allSpans) {
            if (isElementVisible(span) &&
                span.textContent.trim().includes('继续') &&
                !span.className.includes('menu') &&
                !span.className.includes('header')) {
                return span;
            }
        }

        return null;
    } catch (error) {
        console.error('查找按钮时出错:', error);
        return null;
    }
}

// 添加键盘事件监听器
document.addEventListener('keydown', function (event) {
    if (event.key === CONFIG.NEXT_KEY) {
        const button = findNextButton();
        if (button) {
            button.click();
            // 根据按钮类型显示不同的反馈
            const text = button.textContent.trim();

            if (text.includes('答案')) {
                showFeedback('已查看答案');
            } else if (text.includes('继续')) {
                showFeedback('继续下一题');
            }
        }
    }
});

// 添加反馈提示功能
function showFeedback(message) {
    // 移除已有的反馈提示
    const existingFeedback = document.getElementById('extension-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    // 创建新的反馈提示
    const feedback = document.createElement('div');
    feedback.id = 'extension-feedback';
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        z-index: 10000;
        transition: opacity 0.3s;
        opacity: 0;
        pointer-events: none;
    `;
    feedback.textContent = message;
    document.body.appendChild(feedback);

    // 显示反馈
    requestAnimationFrame(() => {
        feedback.style.opacity = '1';
        setTimeout(() => {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 300);
        }, 1000);
    });
}

// 初始化
showFeedback('扇贝助手已启动（按 ↓ 继续）');
