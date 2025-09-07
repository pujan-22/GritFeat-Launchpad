import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

// Task 1: Create a New User
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Task 2: Comprehensive User Search and Retrieval
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      country,
      minFollowers,
      interest,
      profileTheme,
      subscriptionTier,
      page = 1,
      limit = 10
    } = req.query;

    const filter: any = {};

    if (country) filter.country = country;
    if (minFollowers) filter.followers = { $gte: parseInt(minFollowers as string) };
    if (interest) filter.interests = { $in: [interest] };
    if (profileTheme) filter['profile.theme'] = profileTheme;
    if (subscriptionTier) filter['subscription.tier'] = subscriptionTier;

    const options = {
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      sort: { createdAt: -1 }
    };

    const users = await User.find(filter)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit)
      .exec();

    const total = await User.countDocuments(filter);

    res.json({
      users,
      totalPages: Math.ceil(total / options.limit),
      currentPage: options.page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Task 3: Get a Single User by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Task 4: Update User Profile
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, ...updateData } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Task 5: Delete a User
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};