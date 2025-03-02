"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const auth_1 = require("../middleware/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
// 获取当前用户信息
router.get('/me', auth_1.auth, async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        console.error('Failed to fetch user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// 用户登录
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // 验证必填字段
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        // 查找用户
        const user = await User_1.User.findOne({ email, isActive: true });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // 验证密码
        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // 生成 token
        const token = jsonwebtoken_1.default.sign({ _id: user._id.toString() }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
        // 返回用户信息（不包含密码）
        const userObject = user.toObject();
        const { password: _, ...userWithoutPassword } = userObject;
        res.json({ user: userWithoutPassword, token });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});
// 用户登出
router.post('/logout', (req, res) => {
    // 客户端应该清除 token
    res.json({ message: 'Logged out successfully' });
});
exports.default = router;
